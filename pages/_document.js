import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link
            href="https://api.fontshare.com/css?f[]=satoshi@300,400,700&display=swap"
            rel="stylesheet"
          />
          <link
            href="https://api.fontshare.com/css?f[]=erode@400,500,600&display=swap"
            rel="stylesheet"
          />
          <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
          <link rel="icon" type="image/svg+xml" href="favicon.svg" />
          <link rel="icon" type="image/png" href="favicon.png" />
          <link rel="manifest" href="/site.webmanifest" />
          <meta name="Description" content="The Wong Lab's focus is on researching bacterial communities, biofilms, immunity, and antimicrobials. They aim to find ways to prevent and treat biofilm infections by examining surface sensing and messenger signals. Antibiotic-resistant pathogens and designs are also a key area of investigation. In addition, the Wong Lab delves into protein-lipid interactions, synchrotron x-ray techniques, and the physical chemistry of solvation to advance fundamental science." />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument