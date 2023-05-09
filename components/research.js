import Image from "next/image"
import Section from "./section"

const placeholder = "JD_ACS_Central_Science_Cover@0.25x.png"

function Project({ title, image, children, ...props }) {
  return (
    <div className='py-2 sm:flex sm:flex-row gap-4'>
      <Image
        src={image} alt="cover" width="250" height="250" 
        className='h-full w-full max-w-sm sm:w-4/12 pb-2'
      />
      <div className="flex flex-col gap-2">
        <h2 className='font-medium'>
          {title}
        </h2>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default function Research({ ...props }) {
  return (
    <Section title="Science" {...props}>
      <Project title="Bacterial Communities and Biofilms" image={placeholder}>
        <ul>
          <li>Bacterial communities (e.g., c-di-GMP signaling, motility, social organization in biofilms)</li>
          <li>Image processing, machine learning, application of ‘big data’ methods</li>
          <li>Biofouling</li>
          <li>Cystic Fibrosis</li>
        </ul>
      </Project>

      <Project title="Immunity and Antimicrobials" image={placeholder}>
        Innate immunity and antimicrobial peptides
        Antibiotic-resistant pathogens and antibiotic design
        Transporter sequences and cell penetrating peptides for drug delivery
        Budding and scission peptides in viruses
        Autoimmune diseases (e.g., lupus, psoriasis)
        COVID-19: molecular mechanisms for acute inflammation; prevention of viral entry and shedding
      </Project>

      <Project title="Enabling Fundamental Science: Physics, Chemisty, Biology" image={placeholder}>
        Protein-lipid interactions and membrane curvature generation (e.g., Apoptosis proteins and cancer therapeutics)
        Synchrotron x-ray methods
        Physical chemistry of solvation (e.g., femtosecond hydration dynamics of ions and surfaces)
        Soft condensed matter physics of self-assembly (e.g., polymers, polyelectrolytes, membranes, liquid crystals, colloids, nanoparticles)
      </Project>
    </Section>
  )
}
