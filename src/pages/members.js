import React from 'react'
import Layout from '@theme/Layout'
import TOC from '@theme/TOC'

import memberIndex from '../../members.yaml'
import styles from './members.module.css'

// import PlaceholderImage from '../../static/img/undraw_unicorn.svg'


const toc = [
  { id: 'gerard', value: 'Gerard Wong', children: [] },
  { id: 'scientists', value: 'Scientists and Post-docs', children: [] },
  { id: 'graduate-students', value: 'Graduate Students', children: [] },
  { id: 'undergraduates', value: 'Undergraduates', children: [] },
  { id: 'alumni', value: 'Alumni', children: [] },
]


function Container(props) {
  return (
    <main className="container margin-vert--lg">
      {props.children}
    </main>
  )
}

function Header() {
  return (
    <div className="text--center">
      <h1>Our Members</h1>
      <p>A list of all of our present and past members!</p>
    </div>
  )
}

function MultilineDetails({ details }) {
  return (
    <div className={styles.multilineDetails}>
      {details.map(detail => <p>{detail}</p>)}
    </div>
  )
}

function Gerard({ info }) {
  const {
    name,
    role,
    affiliations,
    office,
    email,
    phone,
    'profile-img': profileImage,
  } = info

  return (
    <section className="container margin-vert--lg" id="gerard">
      <div className="row">
        <div className="col col--4">
          <img
            src={`/img/profiles/${profileImage}`}
            alt="Gerard Wong's profile image"
          />
        </div>
        <div className="col">
          <h2>{name}, Ph.D.</h2>
          <p><b>{role}</b></p>
          {affiliations && <MultilineDetails details={affiliations} />}
          <MultilineDetails details={[
            <>Office: {office}</>,
            <>Email: <a href={`mailto:${email}`}>{email}</a></>
          ]} />
        </div>
      </div>
    </section>
  )
}

function Members({ id, category, members }) {

  const renderMember = member => {
    const {
      name,
      role,
      affiliations,
      email,
      'profile-img': profileImage
    } = member

    return (
      <div
        key={name.split(' ').join('+') + '+' + role.split(' ').join('+')}
        className="col col--3"
      >
        {profileImage
          ? <img
              src={`/img/profiles/${profileImage}`}
              alt={`${name}'s profile image`}
              className={styles.memberImage}
            />
          // : <PlaceholderImage />}
          : <img
              src={`/img/undraw_unicorn.svg`}
              alt={`${name}'s profile image`}
              className={styles.memberImage}
            />
        }
        <div>
          <h3>{name}{id === 'scientists' && ', Ph.D.'}</h3>
          <MultilineDetails details={[
            <>{role}</>,
            <>{email && <a href={`mailto:${email}`}>{email}</a>}</>,
            <>{affiliations && <MultilineDetails details={affiliations} />}</>,
          ]} />
        </div>
      </div>
      // <div className="row">
      //   <div className="col col--3">
      //     <img
      //       src={profileImage ? `/img/profiles/${profileImage}` : '/img/undraw_unicorn.svg'}
      //       alt={`${name}'s profile image`}
      //       className={styles.memberImage}
      //     />
      //   </div>
      //   <div className="col">
      //     <h3>{name}{id === 'scientists' && ', Ph.D.'}</h3>
      //     <MultilineDetails details={[
      //       <>{role}</>,
      //       <>{email && <a href={`mailto:${email}`}>{email}</a>}</>,
      //       <>{affiliations && <MultilineDetails details={affiliations} />}</>,
      //     ]} />
      //   </div>
      // </div>
    )
  }

  return (
    <section className="container margin-vert--lg" id={id}>
      <h2>{category}</h2>
      <div className="row margin-top--lg">
        {members.map(member => renderMember(member))}
      </div>
    </section>
  )
}

function AlumniList({ members }) {
  return (
    <section className="container margin-vert--lg" id="alumni">
      <h2>Alumni</h2>
      {members.map(member => (
        <div className="margin-top--lg" key={member.name + member.role}>
          <h3>{member.name}</h3>
          <MultilineDetails details={[
            <>Formerly: {member['former-role'] || ''}</>,
            <>Currently:&nbsp;
              {member.website
                ? <a href={member.website.url}>{member['current-role'] || ''}</a>
                : <>{member['current-role'] || ''}</>
              }
            </>
          ]} />
        </div>
      ))}
    </section>
  )
}

function MembersPage() {
  const order = (a, b) => 
    (a.name.split(' ').slice(-1) > b.name.split(' ').slice(-1)) ? 1 : -1

  const gerardInfo = memberIndex.find(({ name }) => name === 'Gerard Wong')
  const memberCategories = {
    scientists: {
      name: 'Scientists & Post-docs',
      members: memberIndex.filter(({ role }) =>
        role.includes('Scientist') || role.includes('Post-doc'))
    },
    'graduate-students': {
      name: 'Graduate Students',
      members: memberIndex.filter(({ role }) =>
        role.includes('Ph.D. Student') || role.includes('M.S. Student'))
        .sort(order)
    }
  }

  const undergraduates = 
    memberIndex.filter(({ role }) => role.includes('Undergraduate'))

  const alumni = 
    memberIndex.filter(({ role }) => role.includes('Alumni')).sort(order) 

  return (
    <Layout title="Hello">
      <Container>
        <Header />
        <div className="row">
          <div className="col">
            <Gerard info={gerardInfo} />
            {Object.entries(memberCategories).map(([ id, category]) => (
              <Members key={id} id={id} category={category.name} members={category.members} />
            ))}
            {/* <MemberList
              id="undergraduates"
              category="Undergraduates"
              members={undergraduates}
            /> */}
            <AlumniList members={alumni} />
          </div>
          <div className="col col--2">
            <TOC toc={toc} />
          </div>
        </div>
      </Container>
    </Layout>
  )
}

export default MembersPage
