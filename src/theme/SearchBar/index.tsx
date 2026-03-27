import React from 'react';
import Link from '@docusaurus/Link';
import useBaseUrl from '@docusaurus/useBaseUrl';
import OriginalSearchBar from '@theme-original/SearchBar';

type SearchBarProps = React.ComponentProps<typeof OriginalSearchBar>;

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

export default function SearchBar(props: SearchBarProps): React.JSX.Element {
  const searchPageUrl = useBaseUrl('/search');

  return (
    <>
      <div className="mwSearchDesktop" dir="ltr" data-search-variant="desktop">
        <OriginalSearchBar {...props} />
      </div>
      <div className="navbar__search mwMobileSearch" dir="ltr" data-search-variant="mobile">
        <Link
          to={searchPageUrl}
          className="navbar__search-input mwMobileSearchTrigger"
          aria-label="Открыть поиск"
          title="Открыть поиск"
        >
          <SearchIcon />
          <span className="mwMobileSearchLabel">Поиск</span>
        </Link>
      </div>
    </>
  );
}
