import React from 'react';
import { render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import SearchBar from './index';

describe('theme/SearchBar', () => {
  it('renders stable desktop and mobile wrappers intentionally', () => {
    const { container } = render(<SearchBar />);

    expect(container.querySelector('[data-search-variant="desktop"]')).toBeInTheDocument();
    expect(container.querySelector('[data-search-variant="mobile"]')).toBeInTheDocument();
  });

  it('uses a dedicated search page trigger on desktop', () => {
    const { container } = render(<SearchBar />);

    const desktopWrapper = container.querySelector('[data-search-variant="desktop"]');
    expect(desktopWrapper).toBeInTheDocument();
    const desktopTrigger = within(desktopWrapper as HTMLElement).getByRole('link', { name: 'Открыть поиск' });
    expect(desktopTrigger).toHaveAttribute('href', '/search');
    expect(desktopTrigger).toHaveAttribute('data-search-trigger', 'page');
  });

  it('points the mobile trigger to the dedicated search page', () => {
    const { container } = render(<SearchBar />);

    const mobileWrapper = container.querySelector('[data-search-variant="mobile"]');
    expect(mobileWrapper).toBeInTheDocument();
    const mobileTrigger = within(mobileWrapper as HTMLElement).getByRole('link', { name: 'Открыть поиск' });
    expect(mobileTrigger).toHaveAttribute('href', '/search');
    expect(mobileTrigger).toHaveAttribute('data-search-trigger', 'page');
  });

  it('renders a dedicated search-page trigger for each responsive variant', () => {
    render(<SearchBar />);

    expect(screen.getAllByRole('link', { name: 'Открыть поиск' })).toHaveLength(2);
  });
});
