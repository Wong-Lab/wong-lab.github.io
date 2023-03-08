import path from 'path'
import Image from 'next/image'


function Member({ member }) {
  let { name, role, email, affiliations, office } = member
  let profileImg = member["profile-img"]

  return (
    <div>
      {typeof profileImg !== 'undefined' &&
        <Image
          src={path.join('/profiles', profileImg)}
          alt="Photo of ${name}" width="50" height="50"
        />
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

export default function Members({ members, ...props }) {
  let currentMembers = members.filter(m => 'role' in m && m['role'] !== 'Alumni')

  return (
    <section {...props}>
      <h1>Members</h1>
      {currentMembers.map((m, i) => (
        <Member key={`member-${i}`} member={m} />
      ))}
    </section>
  )
}
