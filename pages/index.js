import cover from '../public/JD_ACS_Central_Science_Cover.png'

import Image from 'next/image'
import Publications from '../components/publications'

import path from 'path'
import { loadIndex } from '../lib/pubs'
import { loadYAML } from '../lib/io'
import Members from '../components/members'
import Research from '../components/research'


export default function Home({ pubs, members }) {
  return (
    // background: rgb(2,0,36);
    // background: linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(23,25,37,1) 43%, rgba(43,49,83,1) 100%);
    <div>
      <div className='h-[50vh] flex items-center'>
        <div className=''>
          <h1 className='font-sans text-2xl'>Welcome!</h1>
          <p className='text-xl'>Website is still under construction.</p>
        </div>
        <Image
          src={cover} alt="cover" priority={true}
          className='object-cover object-center w-1/2'
        />
      </div>

      <div className='space-y-6'>
        <Research id="research" />
        <Members id="members" members={members} />
        <Publications id="publications" pubs={pubs} members={members} />
      </div>
    </div>
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
