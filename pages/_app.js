import '../styles/globals.css'

import Head from 'next/head'
import Link from 'next/link'
import { Inter } from 'next/font/google'


const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

function Nav() {
  return (
    <nav className='container z-50 h-12 flex justify-between items-center bg-white/25 text-white'>
      <div>
        {/* Logo */}
        <Link href="/">
          <span className='text'>Wong Lab</span>
        </Link>
      </div>
      <div className='space-x-4'>
        <Link href="research">
          <span className='text'>Our Science</span>
        </Link>
        <Link href="/#members">
          <span className='text'>Members</span>
        </Link>
        <Link href="/#publications">
          <span className='text'>Publications</span>
        </Link>
      </div>
    </nav>
  )
}

function MyApp({ Component, pageProps }) {
  // TODO: watch router and animate nav?

  return (
    <div className={`${inter.className}`}>
      <Head>
        <title>Wong Lab | UCLA</title>
      </Head>
      <Nav/>
      <main>
        <Component {...pageProps}/>
      </main>
    </div>
  )
}

export default MyApp
