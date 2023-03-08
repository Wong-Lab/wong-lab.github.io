import cover from '../public/JD_ACS_Central_Science_Cover.png'

import Image from 'next/image'
import Publications from '../components/publications'

import path from 'path'
import { loadIndex } from '../lib/pubs'
import { loadYAML } from '../lib/io'
import Members from '../components/members'


export default function Home({ pubs, members }) {
  return (
    // background: rgb(2,0,36);
    // background: linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(23,25,37,1) 43%, rgba(43,49,83,1) 100%);
    <div>
      {/* Word cloudish a la https://smartupvisuals.com/ */}
      {/* CSS grid???? */}
      {/* <span>ANTIMICROBIAL PEPTIDES</span>
      <span>IMMUNITY</span>
      <span>LONG COVID</span>
      <span>BIOFILMS</span>
      <span>SURFACE SENSING</span> */}

      <section className='-mt-12 h-screen -z-10 bg-[rgb(2,0,36)] bg-gradient-to-tr from-[rgba(2,0,36,1)] via-[rgba(23,25,37,1)] to-[rgba(43,49,83,1)]'>
        <div className="container flex flex-row relative items-center h-[90vh] overflow-hidden text-white">
          {/* <div className="grid grid-cols-3 gap-4 text-lg w-min-content h-fit backdrop-contrast-50 mix-blend-luminosity">
            <div className="font-semibold text-3xl">Let&apos;s</div>
            <div className="font-normal text-xl">Immunity</div>
            <div className="font-normal text-xl">Biofilms</div>
            <div className="font-semibold text-3xl">Talk</div>
            <div className="font-extralight">Antimicrobial Peptides</div>
            <div className="font-extralight">Surface Sensing</div>
            <div className="font-semibold text-3xl">
              Science
            </div>
            <div className="font-extralight">Drug Development</div>
            <div className="font-extralight">Lineage Tracking</div>
          </div> */}
              {/* Button links to corresponding research page */}
              {/* changes when you click on one of the topics abouve */}

          <div className='z-10'>
            <h1 className="text-6xl">Let's talk science</h1>
          </div>
          <Image
            src={cover} alt="cover" priority={true}
            className="absolute right-0 w-auto h-auto rotate-45 z-0"
          />
        </div>
      </section>

      <div className='container py-6 space-y-6'>
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
