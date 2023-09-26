import path from 'path'
import Link from 'next/link'
import Image from 'next/image'

import RegularLink from '@/components/link'
import Heading from '@/components/heading'
import Section from '@/components/section'
import { loadYAML } from '../lib/io'


export default function AlumniPage({ alumni }) {
  const phds = alumni.filter(m => m['former-role'] === 'Ph.D. Student' || m['former-role'] === 'Post-doc' || m['former-role'] === 'Visiting Scientist')
  const rest = alumni.filter(m => m['former-role'] !== 'Ph.D. Student' && m['former-role'] !== 'Post-doc' && m['former-role'] !== 'Visiting Scientist') 

  return (
    <section className='max-w-prose space-y-8'>
      <Heading.H1 className="font-serif text-5xl pt-14 pb-4">Our Alumni</Heading.H1>
      <Section title={'Ph.D Students and Post-docs'} showTop={false}>
        <div className='space-y-4'>
          {phds.map((m, i) => <Alumni key={`member-${m.name}-${i}]`} alumni={m} />)}
        </div>
      </Section>
      <Section title={'Graduate Students and Undergraduates'} showTop={false}>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-2'>
          {rest.map((m, i) => <Alumni key={`member-${m.name}-${i}]`} alumni={m} />)}
        </div>
      </Section>
    </section>
  )
}

function Alumni({ alumni }) {
  let { name, email, orcid, website } = alumni
  let former = alumni['former-role']
  let current = alumni['current-role']

  return (
    <div className=''>
      <p className='font-medium'>
        {name} ({former})
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
        <p>{current}</p>
        {website && (
          <div>
            <RegularLink href={website.url}>{website.name}</RegularLink>
          </div> 
        )}
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

