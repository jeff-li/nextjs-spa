import React from 'react';
import Head from 'next/head'

type PreRenderProps = {
  name: string;
}

const PreRender: React.FC<PreRenderProps> = ({ name }) => {
  // You can mix-and-match the SPA, SSR, and SSG 
  return (
    <>
      <Head>
        <title>{name}</title>
      </Head>
      <div>
        <main>
          <h1>This is a page created by { name }</h1>
        </main>
      </div>
    </>
  )
}

export async function getStaticProps() {
  return {
    props: {
      name: "Server Static Generation pre-rendering"
    }
  }
}
export default PreRender;

