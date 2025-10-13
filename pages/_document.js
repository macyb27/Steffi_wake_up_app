import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="de">
      <Head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0a0a" />
        <meta name="description" content="Beast Homepage - Workspace Design & Agent Workflows mit Neon-Future-Style" />
        <meta name="keywords" content="Workspace Design, Agent Workflows, Web Development, Next.js, Tailwind CSS, Neon Design" />
        <meta name="author" content="Beast" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Beast Homepage - Neon Future Design" />
        <meta property="og:description" content="Workspace Design & Agent Workflows mit Neon-Future-Style" />
        <meta property="og:image" content="/og-image.jpg" />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Beast Homepage - Neon Future Design" />
        <meta name="twitter:description" content="Workspace Design & Agent Workflows mit Neon-Future-Style" />
        <meta name="twitter:image" content="/og-image.jpg" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
