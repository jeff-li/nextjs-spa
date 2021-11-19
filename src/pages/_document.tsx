import React from 'react'
import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

class CustomDocument extends NextDocument {
  render(): React.ReactElement {
    return (
      <Html lang="ja">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default CustomDocument;
