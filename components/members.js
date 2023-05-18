import Image from 'next/image'
import Link from 'next/link'
import Section from './section'

import gerard from '../public/gerard-wong.webp'

const Gerard = ({ member }) => {
  const { name, affiliations, office } = member;

  return (
    <div className='sm:flex sm:flex-row gap-4'>
      <Image
        className='h-full w-full max-w-sm sm:w-4/12 pb-2'
        src={gerard}
        alt={`Photo of ${name}`}
        width={147}
        height={150}
        keepaspectratio='true'
      />
      <div className='gap-4'>
        <Member member={member} />
        <p>{office}</p>
        {affiliations?.map((a, i) => (
          <p key={`member-${name}-${i}`}>{a}</p>
        ))}
      </div>
    </div>
  );
};

function Member({ member }) {
  let { name, role, email, orcid } = member

  return (
    <div className=''>
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

const roleOrder = [
  'Professor and Principal Investigator',
  'Staff Scientist',
  'Post-doc',
  'Ph.D. Student',
  'Undergraduate',
  'Alumni'
]

export default function Members({ members, ...props }) {
  let [gerard, ...currentMembers] = members
    .filter(m => 'role' in m && m['role'] !== 'Alumni')
    .sort((a, b) => roleOrder.indexOf(a['role']) - roleOrder.indexOf(b['role']))

  return (
    <Section title="Our Lab" {...props}>
      <div className='py-2'>
        <div className='py-2'>
          <Gerard key={`member-${gerard.name}`} member={gerard} />
        </div>
      </div>
      <div className='py-2'>
        <h2 className='text-lg'>Members</h2>
        <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 py-2'>
          {currentMembers.map((m, i) => (
            <Member key={`member-${i}`} member={m} />
          ))}
          <div className='flex items-center'>
            <Link href="/alumni" className='font-sans hover:underline'>Alumni →</Link>
          </div>
        </div>
      </div>
    </Section>
  )
}
