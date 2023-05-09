import Link from 'next/link'
import Image from 'next/image'

import parse from 'html-react-parser'

import Section from './section'


function Pub({ pub, memberNames, memberOrcids, ...props }) {
  const { authors, title, container, published: year, URL } = pub
  
  return (
    <li className="space-y-2">
      <h2 className="text-base font-medium">{parse(title)}</h2>
      <div>
        {authors.map(({ name, orcid }, i) => (
            <span
              key={`${props.key}-author-${i}`}
            >
              <span className={memberNames.has(name) ? "underline" : ""}>{name}</span>
              {orcid && (
                <Link href={orcid} className='pl-0.5'>
                  <Image
                    src="orcid.svg" alt="orcid-icon" width="12" height="12"
                    className='inline-block pb-0.5'
                  />
                </Link>
              )}
              {i != authors.length - 1 && ", "}
            </span>
          )
        )}
      </div>
      <div>
        <span className="italic">{parse(container)}</span>, {year}
      </div>
      <div>
        [ <Link href={URL}>Paper</Link> ]
      </div>
    </li>
  )
}

export default function Publications({ pubs, members, ...props }) {
  let memberNames = new Set(members.flatMap(m => {
    if (m.hasOwnProperty('alt-names'))
      return [m.name, ...m['alt-names']]
    else
      return m.name
  }))

  return (
    <Section title="Publications" {...props}>
      <ol className='sm:list-decimal flex flex-col gap-4 py-2' reversed={true}>
        {pubs.map((pub, i) => (
          <Pub key={`pub-${i}`} pub={pub} memberNames={memberNames} />
        ))}
      </ol>
    </Section>
  )
}
