import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Logo from './Navbar/Logo';
import NavbarWrapper from './Navbar';
import NotFoundContentWrapper from './NotFound/Content';

describe('theme wrappers', () => {
  it('wraps the original navbar inside MeshWorks layout containers', () => {
    const { container } = render(<NavbarWrapper label="wrapped" />);

    expect(container.querySelector('.mwNavbar')).toBeInTheDocument();
    expect(container.querySelector('.mwNavbarInner')).toBeInTheDocument();
    expect(screen.getByTestId('original-navbar')).toHaveTextContent('wrapped');
  });

  it('renders the logo brand with themed assets and homepage link', () => {
    render(<Logo />);

    const brandLink = screen.getByRole('link', { name: 'MeshWorks' });
    expect(brandLink).toHaveAttribute('href', '/');
    expect(screen.getByText('Все о mesh-сетях')).toBeInTheDocument();
    expect(screen.getByAltText('MeshWorks')).toHaveAttribute('data-light-src', '/img/mw-logo-dark.png');
    expect(screen.getByAltText('MeshWorks')).toHaveAttribute('data-dark-src', '/img/mw-logo-light.png');
  });

  it('adds noindex metadata to the custom not found content', () => {
    render(<NotFoundContentWrapper />);

    expect(document.head.querySelector('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow, noarchive');
    expect(document.head.querySelector('meta[name="googlebot"]')).toHaveAttribute('content', 'noindex, nofollow, noarchive');
    expect(screen.getByTestId('not-found-content')).toBeInTheDocument();
  });
});
