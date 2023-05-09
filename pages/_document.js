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