import React from 'react';
import Head from '@docusaurus/Head';
import NotFoundContent from '@theme-original/NotFound/Content';
import type {Props} from '@theme/NotFound/Content';

export default function NotFoundContentWrapper(props: Props) {
  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow, noarchive" />
        <meta name="googlebot" content="noindex, nofollow, noarchive" />
      </Head>
      <NotFoundContent {...props} />
    </>
  );
}
