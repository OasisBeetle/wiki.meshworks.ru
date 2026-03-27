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

  it('keeps the original search component inside the desktop wrapper', () => {
    const { container } = render(<SearchBar />);

    const desktopWrapper = container.querySelector('[data-search-variant="desktop"]');
    expect(desktopWrapper).toBeInTheDocument();
    expect(within(desktopWrapper as HTMLElement).getByTestId('original-search-bar')).toBeInTheDocument();
  });

  it('points the mobile trigger to the dedicated search page', () => {
    render(<SearchBar />);

    const mobileTrigger = screen.getByRole('link', { name: 'Открыть поиск' });
    expect(mobileTrigger).toHaveAttribute('href', '/search');
  });
});
