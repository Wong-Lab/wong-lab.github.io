import Image from "next/image"
import Section from "./section"
import Link from "next/link"

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
          {/* <Link href='/research' className="font-sans text-sm hover:underline">
            Learn more →
          </Link> */}
        </div>
      </div>
    </div>
  )
}

export default function Research({ ...props }) {
  return (
    <Section title="Science" {...props}>
      <Project title="Bacterial Communities and Biofilms" image={placeholder}>
        Biofilms are communities of microbes that can be challenging to treat.
        Pathogenic bacteria like <i>P. aeruginosa</i> and <i>V. cholerae</i>&nbsp;
        form biofilms through surface sensing and secondary messenger signals.
        Understanding these signals can help prevent and treat biofilm infections.

        {/* <ul>
          <li>Bacterial communities (e.g., c-di-GMP signaling, motility, social organization in biofilms)</li>
          <li>Image processing, machine learning, application of ‘big data’ methods</li>
          <li>Biofouling</li>
          <li>Cystic Fibrosis</li>
        </ul> */}
      </Project>

      <Project title="Immunity and Antimicrobials" image={placeholder}>
        {/* Antimicrobial peptides play a crucial role in fighting pathogens by
        disrupting bacterial membranes and organizing nucleic acids.
        Understanding their molecular mechanisms is crucial for developing new
        antibiotics and gaining insight into related phenomena, including viral
        entry, autoimmune diseases, and COVID-19. */}
 
        <ul className="list-disc list-inside">
          <li>Innate immunity and antimicrobial peptides</li>
          <li>Antibiotic-resistant pathogens and antibiotic design</li>
          <li>Transporter sequences and cell penetrating peptides for drug delivery</li>
          <li>Budding and scission peptides in viruses</li>
          <li>Autoimmune diseases (e.g., lupus, psoriasis)</li>
          <li>COVID-19: molecular mechanisms for acute inflammation; prevention of viral entry and shedding</li>
        </ul>
      </Project>

      <Project title="Enabling Fundamental Science" image={placeholder}>
        {/* The physical chemistry of solvation and self-assembly lies at the heart
        of understanding how antimicrobial peptides work. We use synchrotron
        x-ray methods to study protein-lipid interactions and membrane curvature
        generation. These methods contribute to our understanding of apoptosis
        proteins and cancer therapeutics. */}

        <ul className="list-disc list-inside">
          <li>Protein-lipid interactions and membrane curvature generation (e.g., Apoptosis proteins and cancer therapeutics)</li>
          <li>Synchrotron x-ray methods</li>
          <li>Physical chemistry of solvation (e.g., femtosecond hydration dynamics of ions and surfaces)</li>
          <li>Soft condensed matter physics of self-assembly (e.g., polymers, polyelectrolytes, membranes, liquid crystals, colloids, nanoparticles)</li>
        </ul>

        {/* Protein-lipid interactions and membrane curvature generation (e.g., Apoptosis proteins and cancer therapeutics)
        Synchrotron x-ray methods
        Physical chemistry of solvation (e.g., femtosecond hydration dynamics of ions and surfaces)
        Soft condensed matter physics of self-assembly (e.g., polymers, polyelectrolytes, membranes, liquid crystals, colloids, nanoparticles) */}
      </Project>
    </Section>
  )
}
