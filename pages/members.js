import path from 'path'
import ReactMarkdown from 'react-markdown'

import Image from 'next/image'
import Link from 'next/link'
import Section from '@/components/section'
import Heading from '@/components/heading'

import gerard from '@/public/gerard-wong-1x1@0.75x.webp'

import { loadYAML } from '../lib/io'
// import Members from '../components/members'

const groupRoleOrder = [
  'Post-docs and Staff Scientists',
  'Ph.D. Students',
  'Undergraduates',
  'Alumni'
]

const roleGroups = {
  'Post-doc': 'Post-docs and Staff Scientists',
  'Staff Scientist': 'Post-docs and Staff Scientists',
  'Ph.D. Student': 'Ph.D. Students',
  'Undergraduate': 'Undergraduates',
  'Alumni': 'Alumni'
}

const roleOrder = [
  'Staff Scientist',
  'Post-doc',
  'Ph.D. Student',
  'Undergraduate',
  'Alumni'
]

export default function Members({ members, ...props }) {
  let [gerard, ...currentMembers] = members
    .sort((a, b) => roleOrder.indexOf(a['role']) - roleOrder.indexOf(b['role']))

  let groupedCurrentMembers = currentMembers.reduce((acc, m) => {
    let group = roleGroups[m['role']]

    if (!(group in acc))
      acc[group] = []
    
    acc[group].push(m)

    return acc
  }, {})
  
  return (
    <div className='space-y-4 max-w-[900px]'>
      <Heading.H1 className="font-serif text-5xl pt-14 pb-4">Our Group</Heading.H1>
      <Gerard key={`member-${gerard.name}`} member={gerard} />
      {groupRoleOrder.map((group, i) => (
        <Section title={group} key={`members-group-${group}`} showTop={false}>
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 py-2'>
            {groupedCurrentMembers[group].map((m, i) => {
              if (group === 'Alumni')
                return <Alumni key={`member-${m.name}`} member={m} />
              else
                return <Member key={`member-${m.name}`} member={m} />
            })}
          </div>
        </Section>
      ))}
    </div>
  )
}
  
export async function getStaticProps(context) {
  let members = await loadYAML(path.join(process.cwd(), 'members.yaml'))

  return {
    props: {
      members
    },
  }
}

function Gerard({ member }) {
  const { name, orcid, affiliations, office, abstract } = member;

  return (
    <div className='py-2 space-y-4'>
      <div className='md:flex md:flex-row gap-4'>
        <Image
          className='aspect-square h-full md:w-4/12 lg:w-3/12 pb-2'
          src={gerard}
          alt={`Photo of Gerard Wong`}
          keepaspectratio='true'
        />
        <div className='gap-4 space-y-4 max-w-prose'>
          <div>
            <p className='text-xl'>
              {name}
              {orcid && (
                <Link href={`https://orcid.org/${orcid}`} className='pl-0.5 select-none'>
                  <Image
                    src="orcid.svg" alt="orcid-icon" width="12" height="12"
                    className='inline-block pb-0.5'
                  />
                </Link>
              )}
            </p>
            <Member member={member} includeName={false} />
            <p>{office}</p>
          </div>
          <div>
            {affiliations?.map((a, i) => (
              <p key={`member-${name}-${i}`}>{a}</p>
            ))}
          </div>
        </div>
      </div>
      <div className='max-w-prose'>
        <ReactMarkdown>{abstract}</ReactMarkdown>
      </div>
    </div>
  );
};

function Member({ member, includeName = true }) {
  let { name, role, email, orcid } = member

  return (
    <div className=''>
      {includeName &&
        <p className='font-medium'>
          {name}
          {orcid && (
            <Link href={`https://orcid.org/${orcid}`} className='pl-0.5 select-none'>
              <Image
                src="orcid.svg" alt="orcid-icon" width="12" height="12"
                className='inline-block pb-0.5'
              />
            </Link>
          )}
        </p>
      }
      <div>
        <p>{role}</p>
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

function Alumni({ member }) {
  let { name, email, orcid } = member
  let former = member['former-role']
  let current = member['current-role']

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