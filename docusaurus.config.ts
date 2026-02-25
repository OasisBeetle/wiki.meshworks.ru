import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';
import path from 'node:path';

// Node.js ≥20 exposes `globalThis.localStorage` as an experimental getter that
// throws unless the `--localstorage-file` flag is provided. During the static
// build we don't need real localStorage, but referencing the getter (for
// example, inside inline scripts) crashes the build. Remove it proactively so
// SSR doesn't hit the SecurityError while the browser runtime remains
// unaffected.
if (typeof globalThis !== 'undefined' && 'localStorage' in globalThis) {
  const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'localStorage');
  if (descriptor && (descriptor.get || descriptor.set)) {
    try {
      Object.defineProperty(globalThis, 'localStorage', {
        value: undefined,
        writable: true,
        configurable: true,
      });
    } catch {
      /* noop */
    }
  }
}

const enablePwa = process.env.NODE_ENV === 'production';

const config: Config = {
  title: 'MeshWorks',
  tagline: 'База знаний MeshWorks',
  favicon: 'img/favicon-light.png',
  headTags: [
    {
      tagName: 'link',
        attributes: {
          rel: 'icon',
          type: 'image/png',
          href: '/img/favicon-light.png',
        },
      },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SiteNavigationElement',
        name: ['База знаний', 'Контрибьютинг', 'О нас'],
        url: [
          'https://wiki.meshworks.ru/',
          'https://wiki.meshworks.ru/wiki/how-to-edit',
          'https://wiki.meshworks.ru/about',
        ],
      }),
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'MeshWorks Wiki',
        url: 'https://wiki.meshworks.ru',
        inLanguage: 'ru',
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://wiki.meshworks.ru/search?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      }),
    },
    {
      tagName: 'script',
      attributes: {
        type: 'application/ld+json',
      },
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: 'MeshWorks',
        url: 'https://meshworks.ru',
        logo: 'https://wiki.meshworks.ru/img/logo-light.png',
        sameAs: [
          'https://t.me/meshwrks',
          'https://www.youtube.com/@meshwrks',
          'https://boosty.to/meshworks',
        ],
      }),
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.googleapis.com',
      },
    },
    {
      tagName: 'link',
      attributes: {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
      },
    },
  ],
  future: {
    v4: true,
  },
  url: 'https://wiki.meshworks.ru',
  baseUrl: '/',
  trailingSlash: false,
  stylesheets: [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap',
    'https://fonts.googleapis.com/css2?family=Onest:wght@300;400;500;600;700&family=Unbounded:wght@400;500;600&display=swap',
    'https://fonts.googleapis.com/css2?family=Material+Symbols+Rounded:opsz,wght,FILL,GRAD@24,400,0,0&display=swap',
  ],
  organizationName: 'meshworks',
  projectName: 'wiki',
  onBrokenLinks: 'throw',
  markdown: {
    hooks: {
      onBrokenMarkdownLinks: 'throw',
    },
  },
  i18n: {
    defaultLocale: 'ru',
    locales: ['ru'],
  },
  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          routeBasePath: '/',
          breadcrumbs: true,
          editUrl: 'https://github.com/MeshWorksRussia/wiki.meshworks.ru/edit/main/',
          admonitions: {
            keywords: ['favorite'],
            extendDefaults: true,
          },
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
        sitemap: {
          changefreq: 'daily',
          priority: 0.7,
          filename: 'sitemap.xml',
          ignorePatterns: [
            '**/search',
            '**/search/**',
            '**/custom-pages',
            '**/custom-pages/**',
          ],
        },
      } satisfies Preset.Options,
    ],
  ],
  plugins: [
    () => ({
      name: 'webpack-alias-at-src',
      configureWebpack() {
        return {
          resolve: {
            alias: {
              '@': path.resolve(__dirname, 'src'),
            },
          },
        };
      },
    }),
    [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexDocs: true,
        indexPages: true,
        docsRouteBasePath: '/',
        language: ['ru', 'en'],
      },
    ],
    [
      '@docusaurus/plugin-google-gtag',
      {
        trackingID: 'G-4M85P2LD5J',
        anonymizeIP: true,
      },
    ],
    [
      '@docusaurus/plugin-ideal-image',
      {
        quality: 70,
        max: 1600,
        min: 400,
        steps: 4,
      },
    ],
    [
      '@docusaurus/plugin-content-pages',
      {
        id: 'extra-pages',
        path: 'static-pages',
        routeBasePath: '/',
        showLastUpdateAuthor: true,
        showLastUpdateTime: true,
        editUrl: 'https://github.com/MeshWorksRussia/wiki.meshworks.ru/edit/main/',
      },
    ],
    ...(enablePwa
      ? ([
          [
            '@docusaurus/plugin-pwa',
            {
              debug: false,
              offlineModeActivationStrategies: ['appInstalled', 'standalone', 'queryString'],
              pwaHead: [
                {
                  tagName: 'link',
                  rel: 'manifest',
                  href: '/manifest.json',
                },
                {
                  tagName: 'meta',
                  name: 'theme-color',
                  content: '#c6fd50',
                },
              ],
            },
          ],
        ] satisfies Config['plugins'])
      : []),
  ],
  themeConfig: {
    image: 'img/social/wiki-share-1200x630-v2.png',
    metadata: [
      {
        name: 'description',
        content:
          'MeshWorks Wiki — русскоязычная база знаний о Meshtastic, LoRa mesh-сетях и устройствах для автономной связи.',
      },
      {
        name: 'keywords',
        content:
          'meshtastic, meshworks, lora mesh, loRa сеть, автономная связь, wiki meshtastic, инструкции lora',
      },
      {
        property: 'og:site_name',
        content: 'MeshWorks Wiki',
      },
      {
        property: 'og:locale',
        content: 'ru_RU',
      },
    ],
    colorMode: {
      respectPrefersColorScheme: true,
    },
    breadcrumbs: {
      homePageLabel: 'MeshWorks',
    },
    // Algolia is disabled; using local search plugin
    navbar: {
      title: 'MeshWorks',
      logo: {
        alt: 'MeshWorks',
        src: 'img/logo-light.png',
        srcDark: 'img/logo-dark.png',
      },
      items: [
        {
          to: '/',
          position: 'left',
          label: 'Главная',
          activeBaseRegex: '^/$',
        },
        {
          to: '/introduction',
          position: 'left',
          label: 'База знаний',
          activeBaseRegex: '^(?!/$)(?!/(?:about|wiki)(?:/|$)).*$',
        },
        {
          to: '/wiki/how-to-edit',
          position: 'left',
          label: 'Контрибьютинг',
          activeBaseRegex: '^/wiki/how-to-edit/?$',
        },
        {
          to: '/about',
          label: 'О нас',
          position: 'left',
          activeBaseRegex: '^/about/?$',
        },
        {
          type: 'search',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          html: [
            "<div class='footer__links-row'>",
            "<a href='https://www.youtube.com/@meshwrks' target='_blank' rel='noreferrer noopener'>YouTube</a>",
            "<a href='https://boosty.to/meshworks' target='_blank' rel='noreferrer noopener'>Boosty</a>",
            "<a href='https://t.me/meshwrks' target='_blank' rel='noreferrer noopener'>Telegram</a>",
            "<a href='https://status.meshworks.ru/status/meshworks' target='_blank' rel='noreferrer noopener'>Status Page</a>",
            "<a href='https://malla.meshworks.ru/' target='_blank' rel='noreferrer noopener'>Malla</a>",
            '</div>',
            "<div class='footer__trademark'>Meshtastic® is a registered trademark of Meshtastic LLC.</div>",
          ].join(''),
        },
      ],
      copyright: `© ${new Date().getFullYear()} MeshWorks`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
