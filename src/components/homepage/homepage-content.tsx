import { EcosystemStats } from "@/components/homepage/ecosystem-stats";
import { useMobileBreakpoint } from "@/hooks/use-mobile-breakpoint";
import { FileText } from "@/components/icons/lucide";
import Link from "@docusaurus/Link";
import React, { Suspense, startTransition, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./homepage.module.css";

const DeferredHomepageFeatures = React.lazy(async () => {
  const module = await import("./homepage-features");
  return { default: module.HomepageFeatures };
});

const DeferredHomepageDownloads = React.lazy(async () => {
  const module = await import("./homepage-downloads");
  return { default: module.HomepageDownloads };
});

const DeferredNetworkMapBackground = React.lazy(async () => {
  const module = await import("./network-map-background");
  return { default: module.NetworkMapBackground };
});

export function HomePageContent() {
  const isMobile = useMobileBreakpoint();
  const [hasHydrated, setHasHydrated] = useState(false);
  const [showDeferredSections, setShowDeferredSections] = useState(false);
  const [showBackground, setShowBackground] = useState(false);

  useEffect(() => {
    setHasHydrated(true);

    if (typeof window === "undefined") {
      return;
    }

    let active = true;
    let timeoutId: number | null = null;
    let idleId: number | null = null;

    const schedule = () => {
      startTransition(() => {
        if (!active) {
          return;
        }

        setShowDeferredSections(true);
        setShowBackground(!window.matchMedia("(max-width: 996px)").matches);
      });
    };

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(schedule, { timeout: 350 }) as unknown as number;
    } else {
      timeoutId = window.setTimeout(schedule, 1);
    }

    return () => {
      active = false;
      if (idleId !== null && typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        window.clearTimeout(timeoutId);
      }
    };
  }, []);

  const shouldRenderBackground = hasHydrated && showBackground && !isMobile;

  return (
    <div className={clsx("meshtastic-home", styles.root)}>
      {shouldRenderBackground ? (
        <div aria-hidden="true" className={styles.canvas}>
          <Suspense fallback={null}>
            <DeferredNetworkMapBackground />
          </Suspense>
        </div>
      ) : null}

      <main className={clsx("container", styles.main)}>
        <div className={styles.slides}>
          <section className={clsx(styles.slide, styles.hero)} aria-label="Hero">
            <div>
              <h1 className={styles.heroTitle}>
                Связь без интернета.
                <br />
                <span className={styles.heroTitleAccent}>
                  Везде<span className={styles.heroTitleAccentDot}>.</span>
                </span>
              </h1>

              <div className={styles.heroLead}>
                <p>
                  MeshWorks — сообщество энтузиастов mesh‑сетей. Создаём инструменты для автономной связи, развиваем
                  покрытие, делимся знаниями.
                </p>
              </div>

              <div className={styles.ctaRow}>
                <Link
                  className={clsx("button button--primary button--lg", styles.ctaPrimary, styles.ctaButton, styles.ctaWithIcon)}
                  to="/introduction"
                >
                  <span className={styles.ctaIcon} aria-hidden="true">
                    <FileText />
                  </span>
                  База знаний
                </Link>
                <a
                  className={clsx(
                    "button button--secondary button--lg",
                    styles.ctaSecondary,
                    styles.ctaButton,
                  )}
                  href="https://t.me/meshwrks"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Telegram
                </a>
                <a
                  className={clsx(
                    "button button--secondary button--lg",
                    styles.ctaSecondary,
                    styles.ctaButton,
                  )}
                  href="https://www.youtube.com/@meshwrks"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  YouTube
                </a>
              </div>
            </div>

            <div>
              <EcosystemStats />
            </div>
          </section>

          <section className={clsx(styles.slide, styles.section)} aria-label="Scenarios">
            <div className={styles.deferredSection} data-deferred-ready={showDeferredSections ? "true" : "false"}>
              {showDeferredSections ? (
                <Suspense fallback={null}>
                  <DeferredHomepageFeatures />
                </Suspense>
              ) : null}
            </div>
          </section>

          <section className={clsx(styles.slide, styles.section)} aria-label="Clients">
            <div className={styles.deferredSection} data-deferred-ready={showDeferredSections ? "true" : "false"}>
              {showDeferredSections ? (
                <Suspense fallback={null}>
                  <DeferredHomepageDownloads />
                </Suspense>
              ) : null}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
