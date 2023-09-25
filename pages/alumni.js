import path from 'path'
import Link from 'next/link'
import Image from 'next/image'

import Heading from '@/components/heading'
import { loadYAML } from '../lib/io'


export default function AlumniPage({ alumni }) {
  return (
    <section className='max-w-prose'>
      <Heading.H1 className="font-serif text-5xl pt-14 pb-4">Our Group</Heading.H1>
      <div className='py-2'>
        <div className='grid grid-cols-1 gap-4 py-2'>
          {alumni.map((m, i) => (
            <Alumni key={`alumni-${i}`} alumni={m} />
          ))}
        </div>
      </div>
    </section>
  )
}

function Alumni({ alumni }) {
  let { name, email, orcid } = alumni
  let former = alumni['former-role']
  let current = alumni['current-role']

  return (
    <div className=''>
      <p className='font-medium'>
        {name}
        {orcid && (
          <Link href={`https://orcid.org/${orcid}`} className='pl-0.5'>
            <Image
              src="orcid.svg" alt="orcid-icon" width="12" height="12"
              className='inline-block pb-0.5'
            />
          </Link>
        )}
      </p>
      <div>
        <p>{former}</p>
        <p>{current}</p>
        <p>
          <Link href={`mailto:${email}`}>
            <span className='underline'>
              {email}
            </span>
          </Link>
        </p>
      </div>
    </div>
  )
}

export async function getStaticProps(context) {
  let members = await loadYAML(path.join(process.cwd(), 'members.yaml'))

  return {
    props: {
      alumni: members
        .filter(m => 'role' in m && m['role'] === 'Alumni')
        .sort((a, b) => a['name'] < b['name'] ? -1 : 1)
    },
  }
}

