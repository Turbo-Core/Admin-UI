import { Html, Head, Main, NextScript } from 'next/document'
import { NextSeo } from 'next-seo'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <NextSeo
        title="TurboCore Admin"
        description="An admin dashboard to manage TurboCore projects."
        canonical="https://admin.turbocore.com"
      />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
