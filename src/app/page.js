import cover from '../../public/JD_ACS_Central_Science_Cover.png'

import Image from 'next/image'
import styles from './page.module.css'


export default function Home() {
  return (
    <main>
      {/* Word cloudish a la https://smartupvisuals.com/ */}
      {/* CSS grid???? */}
      {/* <span>ANTIMICROBIAL PEPTIDES</span>
      <span>IMMUNITY</span>
      <span>LONG COVID</span>
      <span>BIOFILMS</span>
      <span>SURFACE SENSING</span> */}

    <div className="flex flex-row relative items-center h-[90vh] overflow-hidden">
      <div className="grid grid-cols-3 gap-4 text-lg w-min-content h-fit backdrop-contrast-50 mix-blend-luminosity">
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
      </div>
          {/* Button links to corresponding research page */}
          {/* changes when you click on one of the topics abouve */}

      <Image
        src={cover} alt="cover"
        className="absolute right-0 w-auto h-auto rotate-45 -z-10"
      />
    </div>

      {/* ask Jaime for his acs central science cover w/o words */}
    </main>
  )
}
