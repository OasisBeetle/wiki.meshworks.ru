import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import PortableAntennaCatalog from './PortableAntennaCatalog';

describe('PortableAntennaCatalog', () => {
  it('renders antenna categories and cards', () => {
    render(<PortableAntennaCatalog />);

    expect(screen.getByRole('region', { name: 'Портативные' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Стационарные' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Направленные' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Магнитная TX868-XPL' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Яги 868' })).toBeInTheDocument();
  });

  it('filters by category', () => {
    render(<PortableAntennaCatalog />);

    fireEvent.click(screen.getByRole('button', { name: 'Направленные' }));

    expect(screen.queryByRole('region', { name: 'Портативные' })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Направленные' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Яги 868' })).toBeInTheDocument();
  });

  it('copies antenna href from the share button', async () => {
    const clipboardWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: clipboardWriteText },
    });

    render(<PortableAntennaCatalog />);

    const heading = screen.getByRole('heading', { name: 'Магнитная TX868-XPL' });
    const card = heading.closest('article')!;
    fireEvent.click(within(card).getByRole('button', { name: 'Поделиться' }));

    await waitFor(() => {
      expect(clipboardWriteText).toHaveBeenCalledWith('https://ali.click/n1r631v?erid=2SDnjeZz99K');
    });
    expect(within(card).getByRole('button', { name: 'Ссылка на антенну скопирована' })).toBeInTheDocument();
  });
});
