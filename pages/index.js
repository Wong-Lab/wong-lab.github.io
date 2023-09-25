import { useEffect, useState } from 'react'

import Image from 'next/image'
import RegularLink from '@/components/link'
import Heading from '@/components/heading'

import path from 'path'
import { loadIndex } from '../lib/pubs'
import { loadYAML } from '../lib/io'

import JDACSCover from '../public/JD_ACS_Central_Science_Cover.webp'
import WalkingBacteria from '@/public/walking-bacteria.png'
import BacteriaTrails from '@/public/bacteria-trails.png'

import BacteriaImage from '@/public/bacteria-motility.png'
import MembraneImage from '@/public/membrane-modulation.jpg'
import ImmunologyImage from '@/public/synthetic-immunology-2.png'
import COVIDImage from '@/public/covid.png'
import Container from '@/components/container'


function Hero() {
  const coverImages = [
    {
      image: JDACSCover,
      bg: 'rgb(2,0,36)',
    },
    {
      image: WalkingBacteria,
      bg: 'rgb(35,31,32)'
    }
  ]

  const Slide = ({ image }) => (
    <div className='snap-start snap-always flex-none w-screen max-w-[1920px] sm:h-[640px]'>
      <div className='flex flex-col justify-end h-full'>
        <Image
          src={image} alt="cover" priority={true}
          className='ml-auto blur-md max-w-fit max-h-full sm:max-h-[640px] object-cover lg:blur-sm xl:blur-[1px] lg:min-w-[50%]'
        />
      </div>
    </div>
  )

  // const [currentImageIndex, setCurrentImageIndex] = useState(0)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentImageIndex(currentIndex => (currentIndex + 1) % coverImages.length)
  //   }, 5000);
  //   return () => clearInterval(interval);
  // }, []);

  // const currentImage = coverImages[currentImageIndex]

  return (
    <section className={`relative text-white max-w-[1920px] -mx-4 sm:-mx-14 -mt-[60px] overflow-hidden`}>
      <div className='absolute top-0 left-0 -z-10 h-full bg-[rgb(2,0,36)] sm:static sm:flex sm:flex-row sm:overflow-x-scroll sm:snap-x sm:snap-mandatory'>
        <Slide image={JDACSCover} />
        <Slide image={WalkingBacteria} />
      </div>
      <div className='sm:absolute sm:top-0 sm:left-0 px-4 sm:px-14 py-28 pt-32 md:p-15 max-w-prose min-h-[40em] space-y-8 z-10 xl:backdrop-blur-[1px]'>
        <Heading.H1 className="font-serif text-5xl">Synthetic Microbiology and Immunology</Heading.H1>
        <Heading.H2 className="font-light text-3xl">
          Leveraging state of the art methods in artificial intelligence,
          bioengineering, chemistry, and physics to engage unsolved problems in
          microbiology and immunology.
        </Heading.H2>
        <div className='absolute bottom-0 pb-14'>
          <RegularLink href="/research" className='block text-2xl text-white underline underline-offset-8 decoration-1 hover:decoration-2'>
            Learn More →
          </RegularLink>
        </div>
      </div>
    </section>
  )
}


export default function Home() {
  const ResearchCard = ({ title, description, image, url }) => (
    <div className='relative space-y-2 sm:space-y-0 sm:flex sm:flex-row sm:space-x-4 items-start'>
      <Image src={image} alt={title} className='w-full sm:w-1/4 md:w-2/6 md:w-1/4 h-full' />
      <div className='space-y-2 pb-8'>
        <Heading.H2>{title}</Heading.H2>
        <p className='text-lg'>{description}</p>
        <RegularLink href={url} className='absolute bottom-0 pb-1 block underline underline-offset-4 decoration-1 hover:decoration-2'>
          Learn More →
        </RegularLink>
      </div>
    </div>
  )

  return (
    // background: rgb(2,0,36);
    // background: linear-gradient(45deg, rgba(2,0,36,1) 0%, rgba(23,25,37,1) 43%, rgba(43,49,83,1) 100%);
    <div>
      <Hero />
      <div className='pt-8 space-y-8'>
        <section className='space-y-4'>
          <Heading.H1>Our Mission</Heading.H1>
          <p className='text-lg'>
            We are interested in multidisciplinary approaches to solving problems in
            biology and biomedicine, combining physics, chemistry, biology, and
            engineering. To solve these problems, we use a broad range of tools,
            including synchrotron x-ray scattering and spectroscopy, quantitative
            optical microscopy, microfluidic systems, machine learning and &ldquo;big
            data&rdquo; methods, x-ray and electron microscopy, and laser scanning
            confocal microscopy. The group is inherently interdisciplinary; our
            collaborators include not only bioengineers, but also medical doctors,
            biologists, physicists, chemists, and material scientists. Our
            {' '}<RegularLink href="/research">current interests</RegularLink> are in 
            {' '}<RegularLink href="/research/bacterial-communities-and-biofilms">bacterial biofilms</RegularLink>,
            {' '}<RegularLink href="/research/innate-immune-peptides">immunity & antibiotic design</RegularLink>, and
            {' '}<RegularLink href="/research">fundamental science that enables new bioengineering opportunities</RegularLink>.
          </p>
        </section>
        <section className='space-y-4'>
          <Heading.H1>Research Areas</Heading.H1>
          <div className='space-y-8 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-8 content-start'>
            <ResearchCard
              image={BacteriaImage}
              title='Synthetic Microbiology'
              description="'Social media for microbes': We track entire
              bacterial communities across dozens of generations at single cell
              resolution."
              url='/research/synthetic-microbiology'
            />
            <ResearchCard
              image={MembraneImage}
              title='Innate Immune Peptides'
              description='Understanding innate immune peptide sequences using
              ideas from machine learning, geometry, and coordination
              chemistry.'
              url='/research/innate-immune-peptides'
            />
            <ResearchCard
              image={ImmunologyImage}
              title='Synthetic Immunology'
              description='Programatically assembling supramolecular complexes
              with innate immune peptide chaperones for either pro- or
              anti-inflammatory responses.'
              url='/research/synthetic-immunology'
            />
            <ResearchCard
              image={COVIDImage}
              title='The Physical Immunology of COVID-19'
              description='Studying why the coronavirus responsible for COVID-19
              is so hyperinfectious and hyperinflammatory from a physical
              perspective.'
              url='/research/covid-19'
            />
          </div>
        </section>
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
