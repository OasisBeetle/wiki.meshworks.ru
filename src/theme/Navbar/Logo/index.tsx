import React from "react";
import Link from "@docusaurus/Link";
import useBaseUrl from "@docusaurus/useBaseUrl";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import ThemedImage from "@theme/ThemedImage";

export default function Logo() {
  const { siteConfig } = useDocusaurusContext();
  const home = useBaseUrl("/");

  return (
    <div className="mwBrand">
      <Link className="mwBrandLink navbar__brand" to={home} aria-label={siteConfig.title}>
        <ThemedImage
          className="mwLogo"
          alt="MeshWorks"
          sources={{
            light: useBaseUrl("/img/mw-logo-dark.png"),
            dark: useBaseUrl("/img/mw-logo-light.png"),
          }}
        />

        <span className="mwBrandText">
          <span className="mwBrandName">MeshWorks</span>
          <span className="mwBrandSub">Все о меш сетях</span>
        </span>
      </Link>
    </div>
  );
}
