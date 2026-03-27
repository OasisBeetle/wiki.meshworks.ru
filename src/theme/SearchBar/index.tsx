import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';

function SearchIcon(): React.JSX.Element {
  return (
    <svg
      className="mwMobileSearchIcon"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
    >
      <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="2" />
      <path d="M16 16l4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

type SearchVariant = 'desktop' | 'mobile';

function SearchPageTrigger({
  searchPageUrl,
  variant,
}: {
  searchPageUrl: string;
  variant: SearchVariant;
}): React.JSX.Element {
  const variantClassName =
    variant === 'desktop' ? 'mwSearchPageTrigger' : 'mwSearchPageTrigger mwMobileSearchTrigger';

  return (
    <Link
      to={searchPageUrl}
      className={`navbar__search-input ${variantClassName}`}
      aria-label="Открыть поиск"
      title="Открыть поиск"
      data-search-trigger="page"
    >
      <SearchIcon />
      <span className="mwSearchPageLabel">Поиск</span>
    </Link>
  );
}

export default function SearchBar(): React.JSX.Element {
  const searchPageUrl = useBaseUrl('/search');

  return (
    <>
      <div className="navbar__search mwSearchDesktop" dir="ltr" data-search-variant="desktop">
        <SearchPageTrigger searchPageUrl={searchPageUrl} variant="desktop" />
      </div>
      <div className="navbar__search mwMobileSearch" dir="ltr" data-search-variant="mobile">
        <SearchPageTrigger searchPageUrl={searchPageUrl} variant="mobile" />
      </div>
    </>
  );
}
