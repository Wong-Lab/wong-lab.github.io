import '../styles/globals.css'

import Head from 'next/head'
import Link from 'next/link'
// import { Inter } from 'next/font/google'


// const inter = Inter({
//   subsets: ['latin'],
//   display: 'swap',
// })

function Nav() {
  return (
    <nav className='flex flex-row p-4 items-center justify-between container max-w-prose'>
      <div>
        {/* Logo */}
        <Link href="/">
          <span className='font-medium text-xl'>Wong Lab</span>
        </Link>
      </div>
      <div className='space-x-4'>
        <Link href="/#research" className='hover:underline'>
          <span className=''>Science</span>
        </Link>
        <Link href="/#members" className='hover:underline'>
          <span className=''>Members</span>
        </Link>
        <Link href="/#publications" className='hover:underline'>
          <span className=''>Publications</span>
        </Link>
      </div>
    </nav>
  )
}

function MyApp({ Component, pageProps }) {
  // TODO: watch router and animate nav?

  return (
    <div>
      <Head>
        <title>Wong Lab | UCLA</title>
      </Head>
      <Nav />
      <div className='mx-auto p-4 font-serif'>
        <main className='container max-w-prose'>
          <Component {...pageProps}/>
        </main>
      </div>
    </div>
  )
}

export default MyApp
