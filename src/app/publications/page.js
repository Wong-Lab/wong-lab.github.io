import path from 'path'
import Link from 'next/link'
import Image from 'next/image'

import parse from 'html-react-parser'

import { loadIndex } from '@/lib/pubs'


function Pub({ pub, memberNames, ...props }) {
  const { authors, title, container, published: year, URL } = pub
  
  return (
    <div {...props} className="max-w-prose space-y-2">
      <h2 className="text-base font-medium">{parse(title)}</h2>
      <div>
        {authors.map(({ name, orcid }, i) => (
          <span
            key={`${props.key}-author-${i}`}
            className={memberNames.has(name) && "font-semibold"}
          >
            {name}
            {orcid && (
              <Link href={orcid}>
                <Image src="orcid.svg" width="10" height="10" className='inline'/>
              </Link>
            )}
            {i != authors.length - 1 && ", "}
          </span>
        ))}
      </div>
      <div>
        <span className="italic">{parse(container)}</span>, {year}
      </div>
      <div>
        [ <Link href={URL}>Paper</Link> ]
      </div>
    </div>
  )
}

export default async function Publications() {
  let pubs = await loadIndex(path.join(process.cwd(), 'pubs.yaml'))
  let memberNames = new Set([])

  return (
    <div className="space-y-6">
      <h1>Publications</h1>

      {pubs.map((pub, i) => (
        <Pub key={`pub-${i}`} pub={pub} memberNames={memberNames} />
      ))}
    </div>
  )
}
