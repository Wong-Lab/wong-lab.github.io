import path from 'path'

import { loadIndex } from '@/lib/pubs'
import { loadYAML } from '@/lib/io'

import Link from '@/components/link'
import Image from 'next/image'
import Heading from '@/components/heading'

import parse from 'html-react-parser'


export default function Publications({ pubs, members, ...props }) {
  let memberNamesAndOrcids = new Map(members.flatMap(m => {
    let entries = [[m.name, m.orcid || '']]

    if (m.hasOwnProperty('alt-names'))
      return [...entries, ...m['alt-names'].map(n => [n, m.orcid || ''])]
    
    return entries
  }))

  const numberOfPubs = pubs.length

  return (
    <div>
      <Heading.H1 className="font-serif text-5xl pt-14 pb-4">Our Publications</Heading.H1>
      <div className='max-w-prose py-2 sm:ml-10'>
        <ol className='font-sans sm:list-decimal text-sm flex flex-col gap-4 py-2' reversed={true}>
          {pubs.map((pub, i) => (
            <Pub key={`pub-${i}`} pub={pub} memberNamesAndOrcids={memberNamesAndOrcids} id={`${numberOfPubs - i}`}/>
          ))}
        </ol>
      </div>
    </div>
  )
}

export const encodeDOI = doi => doi
  .replaceAll('/', '~')
  .replaceAll(':', '+')
  .replaceAll('(', '[')
  .replaceAll(')', ']')

function Pub({ pub, memberNamesAndOrcids, ...props }) {
  const id = props.id
  const {
    authors, title, container, published: year, URL, pdf, doi,
    pressrelease, preprint, cover, commentary,

    // for book chapters  
    chapter: isChapter, book: bookTitle, bookURL, publisher
  } = pub

  return (
    <li className="space-y-2 relative marker:font-semibold marker:text-sm marker:font-sans scroll-mt-16" id={id}>
      <h2 className="text-base font-semibold">{parse(title)}</h2>
      <div>
        {authors.map(({ name, orcid }, i) => {
          let actualOrcid = orcid || (memberNamesAndOrcids.has(name) && memberNamesAndOrcids.get(name) && `http://orcid.org/${memberNamesAndOrcids.get(name)}`) || ''
          
          return (
            <span
              key={`${props.key}-author-${i}`}
              className='inline-block whitespace-pre'
            >
              <span className={memberNamesAndOrcids.has(name) ? "font-bold" : ""}>{name}</span>
              {actualOrcid && (
                <Link href={actualOrcid} className='pl-0.5 select-none'>
                  <Image
                    src="orcid.svg" alt="orcid-icon" width="12" height="12"
                    className='inline-block pb-0.5'
                  />
                </Link>
              )}
              {i != authors.length - 1 && ", "}
            </span>
          )
        })}
      </div>
      <div>
        {isChapter && <span className="italic">{parse(bookTitle)}, </span>}
        <span className="italic">{parse(isChapter ? publisher : container || preprint.name || "")}</span>, {year || (preprint && preprint['published']) || ""}
      </div>
      <div className='space-x-2'>
        {URL && (isChapter
          ? <Link href={URL}>Chapter</Link>
          : <Link href={URL}>Article</Link>
        )}
        {isChapter && bookURL && <Link href={bookURL}>Book</Link>}
        {pdf && (container != 'BioRxiv' && (([pdf]).flatMap(({ url, name }) => <Link href={`/pdf/${pdf}`}>PDF</Link>)||([pdf]).flatMap(({ url, name }) => <Link href={`/pdf/${encodeDOI(doi)}.pdf`}>PDF</Link>)))}
        {pressrelease && ([pressrelease]).flatMap(({ url, name }) => <Link href={url} title={name} key={`pub-pr-${name}`}>{name}</Link>)}
        {preprint && ([preprint]).flatMap(({ url, name }) => <Link href={url} title={name} key={`pub-pr-${name}`}>Preprint</Link>)}
        {commentary && ([commentary]).flatMap(({ url, name }) => <Link href={url} title={name} key={`pub-pr-${name}`}>Commentary</Link>)}
      </div>
      {cover && (
        <Link href={cover.url}>
          <img
            src={cover.url} alt={cover.name}
            className='w-full max-h-[20rem] pt-4 xl:pt-0 xl:pb-0 xl:absolute xl:top-0 xl:left-[75ch] xl:aspect-auto xl:max-w-[calc(min(100vw-60ch-7rem,20ch))] xl:h-full object-scale-down'
            {...props}
          />
        </Link>
      )}
    </li>
  )
}

export async function getStaticProps(context) {
  let pubs = await loadIndex(path.join(process.cwd(), 'pubs.yaml'))
  let members = await loadYAML(path.join(process.cwd(), 'members.yaml'))

  return {
    props: {
      pubs,
      members
    },
  }
}
