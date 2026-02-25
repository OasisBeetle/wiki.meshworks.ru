import { HomePageContent } from "@/components/homepage/homepage-content";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import React from "react";

export default function Home() {
  const title = "Связь без интернета — MeshWorks Wiki";
  const description =
    "MeshWorks Wiki — база знаний о mesh-связи и сетях без интернета: технологии, инструменты, карта сети, устройства и инструкции.";
  const url = "https://wiki.meshworks.ru/";
  const image = "/img/social/wiki-share-1200x630-v2.png";

  return (
    <Layout
      title={title}
      description={description}
    >
      <Head>
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="MeshWorks Wiki" />
        <meta property="og:locale" content="ru_RU" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Head>
      <HomePageContent />
    </Layout>
  );
}
