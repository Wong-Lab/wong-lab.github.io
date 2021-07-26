import pThrottle from 'p-throttle'
import dedent from 'dedent'
import fs from 'fs'
import { fileURLToPath } from 'url';
import fetch from 'node-fetch'
import { loadYAML } from './util.mjs'


const CROSSREF_API = "https://api.crossref.org"
const DEFAULT_PUBS_INDEX = 'pubs.yaml'
const DEFAULT_MEMBERS_LIST = 'members.yaml'

const throttle = pThrottle({
  limit: 25,
  interval: 1000
})


const fetchRef = throttle(doi =>
  fetch(`${CROSSREF_API}/works/${doi}`)
    .then(res => res.json())
    .catch(_ => {
      console.warn('Could not find CrossRef entry for ' + doi)
      return {}
    })
    .then(data => data.message)
, 200, {leading: true, accumulate: true})

const loadIndex = (indexPath = DEFAULT_PUBS_INDEX) =>
  loadYAML(indexPath)

const loadMembers = (membersPath = DEFAULT_MEMBERS_LIST) =>
  loadYAML(membersPath)

const cleanAbstract = abstract => dedent(abstract
  .replace(/<[\/]?jats:p>/g, '')
  .replace(/<jats:italic>([^<]*)<\/jats:italic>/g, '_$1_')
  .replace(/<jats:bold>([^<]*)<\/jats:bold>/g, '**$1**')
  .replace(/<jats:strike>([^<]*)<\/jats:strike>/g, '~~$1~~')
  .replace(/<jats:sub>([^<]*)<\/jats:sub>/g, '<sub>$1</sub>'))

const encodeDOI = doi => doi
  .replaceAll('/', '~')
  .replaceAll(':', '+')
  .replaceAll('(', '[')
  .replaceAll(')', ']')

const isSamePerson = (name, candidate) =>
  name.toUpperCase().split(' ').every(n => candidate.toUpperCase().includes(n))

const cleanLine = line => line
  .replaceAll(/\s{2,}/g, ' ')
  .replace(/([A-Z]{1}\. [a-z]+)/g, '<em>$1</em>')

const processAuthors = (authors, members, modifiers = {}) => authors
  .map(({ ORCID: orcid, given, family }) => ({
    orcid,
    given,
    family: family.replace("'", '&apos;'),
    isGerard: family === 'Wong' && given.includes('Gerard'),
    isMember: members.some(member =>
      [member.name, ...(member['alt-names'] || [])]
        .some(name => isSamePerson(name, `${given} ${family}`))),
    isFirst: modifiers.first.some(name => isSamePerson(name, `${given} ${family}`)),
    isCorresponding: modifiers.corresponding.some(name => isSamePerson(name, `${given} ${family}`)),
  }))

const generateMarkdown = (metadata, members) => {
  let dateParts = metadata.published['date-parts'][0]

  while (dateParts.length < 3)
    dateParts = [...dateParts, 1]

  const publishedDate = dateParts
    .map(part => part.toString().padStart(2, '0')).join('-')

  const tags = [...new Set([
    ...(metadata['short-container-title'] || []),
    ...(metadata.subject || []),
    ...(metadata.tags || [])
  ].filter(x => typeof(x) === 'string').map(x => `\'${x}\'`))]

  const authors = processAuthors(metadata.author, members, {
    first: metadata['first-authors'] || [],
    corresponding: metadata['corresponding-authors'] || []
  })

  const renderAbstract = abstract => dedent`
    ### Abstract
    ${cleanAbstract(abstract)}
  `

  return dedent`
    ---
    title: '${cleanLine(metadata.title)}'
    slug: ${encodeDOI(metadata.doi)}
    date: ${publishedDate}
    journal: '${metadata['container-title']}'
    author: '${JSON.stringify(authors)}'
    hasAbstract: ${metadata.abstract ? 'true': 'false'}
    pdf: /pdfs/${metadata.pdf}
    url: ${metadata.URL}
    ${metadata.image ? 'image: ' + metadata.image : ''}
    ${metadata.description ? 'description: ' + metadata.description : ''}
    tags: [${tags.join(', ')}]
    ---
    <!--truncate-->
    ${metadata.abstract ? renderAbstract(metadata.abstract) : ''}

    ${metadata.see_also || metadata.additional ? '### Related Materials' : ''}
    ${metadata.see_also || ''}
    ${metadata.additional || ''}

  `.trim()
}

/**
 * Generate Markdown Entries for Publications
 **/
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const args = process.argv.slice(2) 
  const rebuildAll = args.includes('--all')
  const verbose = args.includes('-v') || args.includes('--verbose')

  Promise.all([
    loadIndex()
      .then(index => 
        (rebuildAll)
          ? index
          : index.filter(({ doi }) => !fs.existsSync(`pubs/${encodeDOI(doi)}.md`)))
      .then(index => {
        if (verbose)
          console.log(index.length
            ? `Building entries for ${index.length} publications`
            : 'There are no new entries to build.')
        return index
      })
      .then(index => 
        Promise.all(index.map(({ doi }) => fetchRef(doi)))
          .then(results => results.map((res, i) => ({
            ...index[i], ...res,
            title: (res && res.title.length)
              ? res.title[0]
              : index[i].title,
            encodedDOI: encodeDOI(index[i].doi)
          })))),
    loadMembers()
  ])
    .then(([metadata, members]) => 
      metadata.map(data => [data.encodedDOI, generateMarkdown(data, members)]))
    .then(mds => mds.map(([fn, md]) => fs.writeFileSync(`pubs/${fn}.md`, md)))
}
