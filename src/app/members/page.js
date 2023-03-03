import path from 'path'
import Image from 'next/image'

import { loadYAML } from '@/lib/io'


function Member({ member }) {
  let { name, role, email, affiliations, office } = member
  let profileImg = member["profile-img"]

  return (
    <div>
      {typeof profileImg !== 'undefined' &&
        <Image src={path.join('/profiles', profileImg)} width="50" height="50" />
      }
      <span>{name}</span>
      <span>{role}</span>
      <span>{email}</span>
      <span>{office}</span>
      {typeof affiliations !== 'undefined' && affiliations.map((a, i) => (
        <span key={`member-${name}-${i}`}>{a}</span>
      ))}
    </div>
  )
}

export default async function Members({ }) {
  let members = await loadYAML(path.join(process.cwd(), 'members.yaml'))
  let currentMembers = members.filter(m => 'role' in m && m['role'] !== 'Alumni')

  return (
    <div>
      Members
      {currentMembers.map((m, i) => (
        <Member key={`member-${i}`} member={m} />
      ))}
    </div>
  )
}

// export async function getStaticProps(context) {
//   let members = await loadYAML(path.join(process.cwd(), 'members.yml'))

//   return {
//     props: {
//       members
//     },
//   }
// }
