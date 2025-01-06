import { promises as fs } from 'fs'
import pThrottle from 'p-throttle'
import { parse, stringify } from 'yaml'

const CROSSREF_API = "https://api.crossref.org"

const throttle = pThrottle({
  limit: 5,
  interval: 1000
})

const fetchRef = throttle(doi =>
  fetch(`${CROSSREF_API}/works/${doi}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      return res
    })
    .then(res => res.json())
    .then(data => data.message),
  200, {leading: true, accumulate: true})

const extractAuthors = ({ ORCID = '', given, family, sequence }) => {
  return {
    orcid: ORCID,
    name: ([given, family]).join(' '),
    first: sequence === 'first'
  }
}

const extractDate = refPublished => refPublished['date-parts'][0][0]
const extractFullDate = refPublished => refPublished['date-parts'][0].join('-')

const extractFields = ref => {
  let title = ref["title"][0]
  let { URL } = ref
  let container = ref["container-title"][0] || null
  let shortContainer = ref["short-container-title"][0] || null

  // publisher, author, URL, published 
  let authors = ref.author.map(extractAuthors)
  let published = extractDate(ref.published)
  let fullPublished = extractFullDate(ref.published)

  return { title, container, shortContainer, authors, URL, published, fullPublished }
}

export const loadIndex = async (path, check_all = false) => {
  const file = await fs.readFile(path, 'utf8')
  let index = parse(file)

  let doisToLookUp = index
    .map((entry, i) => [i, entry])
    .filter(([_, { checked, donotcheck }]) => check_all || (!donotcheck && !checked))
    .map(([i, { doi }]) => [i, doi])

  if (doisToLookUp.length != 0) {
    let fetched = await Promise.all(doisToLookUp.map(async ([i, doi]) => ([
      i, await fetchRef(doi).then(extractFields).catch(err => {
        console.warn(err)
        return null
      })
    ])))

    for (const [i, data] of fetched) {
      if (data != null)
        index[i] = { ...index[i], ...data, checked: true }
    }
    
    index = index.sort(({ published: a }, { published: b }) => b - a)

    fs.writeFile(path, stringify(index), 'utf-8')
  }

  return index
}
