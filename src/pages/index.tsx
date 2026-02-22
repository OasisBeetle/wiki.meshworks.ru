import { HomePageContent } from "@/components/homepage/homepage-content";
import Head from "@docusaurus/Head";
import Layout from "@theme/Layout";
import React from "react";

import "../css/meshtastic-home.css";

export default function Home() {
  return (
    <Layout
      title="Meshtastic на русском"
      description="Русскоязычная база знаний MeshWorks о Meshtastic: выбор устройств, настройка нод, антенны и решение проблем."
    >
      <Head>
        <meta property="og:title" content="Meshtastic на русском — MeshWorks Wiki" />
        <meta property="og:image" content="/img/social/wiki-share-1200x630.png" />
        <meta property="og:url" content="https://wiki.meshworks.ru/" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>
      <HomePageContent />
    </Layout>
  );
}
