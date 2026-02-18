import React from 'react';
import { fireEvent, render, screen, within } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import PortableCopyCatalog from './PortableCopyCatalog';

describe('PortableCopyCatalog', () => {
  it('renders default sections and cards from multiple categories', () => {
    render(<PortableCopyCatalog />);

    expect(screen.getByRole('region', { name: 'Универсальные' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Солнечные' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Отдельные платы' })).toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ThinkNode M1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'D5 Mini Solar Kit (Heltec V3)' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'FakeTec V5.5' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Универсальные' })).not.toBeInTheDocument();
  });

  it('filters by category', () => {
    render(<PortableCopyCatalog />);

    fireEvent.click(screen.getByRole('button', { name: '☀️ Солнечные' }));

    expect(screen.queryByRole('region', { name: 'Универсальные' })).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Отдельные платы' })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Солнечные' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'D5 Mini Solar Kit (Heltec V3)' })).toBeInTheDocument();
  });

  it('filters by tech', () => {
    render(<PortableCopyCatalog />);

    fireEvent.click(screen.getByRole('button', { name: '⚡ ESP' }));

    expect(screen.queryByRole('heading', { name: 'ThinkNode M1' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'T-LoRa Pager' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Heltec WiFi LoRa 32 (V3)' })).toBeInTheDocument();
  });

  it('applies combined category and tech filters', () => {
    render(<PortableCopyCatalog />);

    fireEvent.click(screen.getByRole('button', { name: '🧩 Отдельные платы' }));
    fireEvent.click(screen.getByRole('button', { name: '🟢 NRF' }));

    expect(screen.getByRole('region', { name: 'Отдельные платы' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'FakeTec V5.5' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'Heltec WiFi LoRa 32 (V3)' })).not.toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'ThinkNode M1' })).not.toBeInTheDocument();
  });

  it('exposes ARIA groups and pressed state', () => {
    render(<PortableCopyCatalog />);

    const typeGroup = screen.getByRole('group', { name: 'Фильтр по типу' });
    const techGroup = screen.getByRole('group', { name: 'Фильтр по чипу' });

    expect(typeGroup).toBeInTheDocument();
    expect(techGroup).toBeInTheDocument();

    expect(within(typeGroup).getByRole('button', { name: 'Все' })).toHaveAttribute('aria-pressed', 'true');
    fireEvent.click(within(techGroup).getByRole('button', { name: '🟢 NRF' }));
    expect(within(techGroup).getByRole('button', { name: '🟢 NRF' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders two-level device description text blocks', () => {
    render(<PortableCopyCatalog />);

    expect(screen.getByText('Готовая нода с GPS в компактном корпусе, ориентированная на мобильные и автономные сценарии.')).toBeInTheDocument();
    expect(screen.getByText('Подходит для выездных станций, навигации и трекинга.')).toBeInTheDocument();
  });
});
