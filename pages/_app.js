import '../styles/globals.css'

import { useState } from 'react'
import { MDXProvider } from '@mdx-js/react'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import RegularLink from '@/components/link'
import Heading from '@/components/heading'
import Container from '@/components/container'

// import { Inter } from 'next/font/google'


// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
// })

function Nav() {
  const [expanded, setExpanded] = useState(false)

  return (
    <nav className={`flex z-20 p-4 px-4 sm:px-14 fixed w-full text-white backdrop-blur-sm bg-[rgb(2,0,36)] bg-opacity-80 select-none max-w-[1920px] ${expanded ? 'h-screen flex-col justify-start' : 'flex-row justify-between items-center'}`}>
      <div>
        {/* Logo */}
        <Link href="/" onClick={() => setExpanded(false)}>
          <span className='font-medium text-xl whitespace-nowrap'>Wong Lab</span>
        </Link>
      </div>
      <div>
        <Image
          src="bars-solid.svg" alt="menu" width={16} height={16}
          className={`text-white sm:hidden ${expanded && 'hidden'} hover:cursor-pointer hover:underline underline-offset-4`}
          onClick={() => setExpanded(true)}
        />
        <div className={`${!expanded && 'space-x-4'} sm:block ${expanded ? 'block w-screen py-4 text-lg' : 'hidden'}`}>
          <Link href="/research" className={`hover:underline underline-offset-4 ${expanded && 'block'}`} onClick={() => setExpanded(false)}>
            <span className=''>Research</span>
          </Link>
          {/* <Link href="/news" className='hover:underline underline-offset-4'>
            <span className=''>News</span>
          </Link> */}
          <Link href="/publications" className={`hover:underline underline-offset-4 ${expanded && 'block'}`} onClick={() => setExpanded(false)}>
            <span className=''>Publications</span>
          </Link>
          <Link href="/members" className={`hover:underline underline-offset-4 ${expanded && 'block'}`} onClick={() => setExpanded(false)}>
            <span className=''>Members</span>
          </Link>
        </div>
        <Image
          src="x-solid.svg" alt="menu" width={12} height={12}
          className={`text-white ${!expanded && 'hidden'} hover:cursor-pointer hover:underline underline-offset-4`}
          onClick={() => setExpanded(false)}
        />
      </div>
    </nav>
  )
}

const components = {
  wrapper: ({components, ...rest}) => <article className='relative space-y-4 w-full max-w-prose' {...rest} />,
  img: (props) => <img className='w-full max-h-[20rem] pb-2 xl:pb-0 xl:absolute xl:left-[60ch] xl:aspect-auto xl:max-w-[calc(100vw-60ch-7rem)] xl:h-full object-scale-down' {...props} />,
  a: RegularLink,
  h1: (props) => <Heading.H1 className="font-serif text-5xl pt-14 pb-2" {...props} />,
  h2: (props) => <Heading.H2 className="text-3xl pt-4" {...props} />,
  p: (props) => <p className="relative text-lg overflow-y-visible" {...props} />,
  ul: (props) => <ul className="text-lg" {...props} />,
  ol: (props) => <ol className="text-lg" {...props} />,
  li: (props) => <li className="text-lg list-disc" {...props} />,
//   pre: Pre,
//   code: InlineCode,
}
 
function MyApp({ Component, pageProps }) {
  // TODO: watch router and animate nav?

  return (
    <div className='ultrawide:max-w-[1920px] ultrawide:mx-auto'>
      <Head>
        <title>Wong Lab | UCLA</title>
      </Head>
      <Nav />
      <MDXProvider components={components}>
        <Container>
          <Component {...pageProps}/>
        </Container>
      </MDXProvider>
    </div>
  )
}

export default MyApp
