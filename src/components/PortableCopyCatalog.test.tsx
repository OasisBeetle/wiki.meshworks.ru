import React from 'react';
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import PortableCopyCatalog from './PortableCopyCatalog';
import { DEVICE_DATA } from './portable-catalog/data';

const originalMatchMedia = window.matchMedia;

function mockMatchMedia(matches: boolean) {
  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation(() => ({
      matches,
      media: '(max-width: 996px)',
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

/** Find a device card by its heading title and click the "Купить" button inside it. */
function clickBuyForDevice(deviceTitle: string) {
  const heading = screen.getByRole('heading', { name: deviceTitle });
  const card = heading.closest('article')!;
  const buyButton = within(card).getByRole('button', { name: 'Купить' });
  fireEvent.click(buyButton);
}

afterEach(() => {
  if (originalMatchMedia) {
    window.matchMedia = originalMatchMedia;
  } else {
    delete (window as Partial<Window>).matchMedia;
  }
});

describe('PortableCopyCatalog', () => {
  it('copies device href from the share button with clipboard API and shows copied state', async () => {
    const thinkNode = DEVICE_DATA.universal.find((device) => device.title === 'ThinkNode M1');
    const clipboardWriteText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: { writeText: clipboardWriteText },
    });

    render(<PortableCopyCatalog />);

    const heading = screen.getByRole('heading', { name: 'ThinkNode M1' });
    const card = heading.closest('article')!;
    const shareButton = within(card).getByRole('button', { name: 'Поделиться' });

    fireEvent.click(shareButton);

    await waitFor(() => {
      expect(clipboardWriteText).toHaveBeenCalledOnce();
    });
    expect(thinkNode?.href).toBeDefined();
    expect(clipboardWriteText).toHaveBeenCalledWith(thinkNode!.href);
    expect(within(card).getByRole('button', { name: 'Ссылка на устройство скопирована' })).toBeInTheDocument();
  });

  it('falls back to document.execCommand when clipboard API is unavailable', async () => {
    Object.defineProperty(navigator, 'clipboard', {
      configurable: true,
      value: undefined,
    });
    const execCommandSpy = vi.fn(() => true);
    Object.defineProperty(document, 'execCommand', {
      configurable: true,
      value: execCommandSpy,
    });

    render(<PortableCopyCatalog />);

    const heading = screen.getByRole('heading', { name: 'ThinkNode M1' });
    const card = heading.closest('article')!;
    fireEvent.click(within(card).getByRole('button', { name: 'Поделиться' }));

    await waitFor(() => {
      expect(execCommandSpy).toHaveBeenCalledWith('copy');
    });
  });

  it('renders default sections and cards from multiple categories', async () => {
    render(<PortableCopyCatalog />);

    expect(screen.getByRole('region', { name: 'Готовые' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Солнечные' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Платы' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Готовые' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Солнечные' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Платы' })).toBeInTheDocument();
    expect(screen.queryByText('Отдельные платы')).not.toBeInTheDocument();

    expect(screen.getByRole('heading', { name: 'ThinkNode M1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'D5 Mini Solar Kit (Heltec V3)' })).toBeInTheDocument();
    expect(await screen.findByRole('heading', { name: 'FakeTec V5.5' })).toBeInTheDocument();
  });

  it('filters by category', () => {
    render(<PortableCopyCatalog />);

    fireEvent.click(screen.getByRole('button', { name: 'Солнечные' }));

    expect(screen.queryByRole('region', { name: 'Готовые' })).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Платы' })).not.toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Солнечные' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'D5 Mini Solar Kit (Heltec V3)' })).toBeInTheDocument();
  });

  it('filters by tech', () => {
    render(<PortableCopyCatalog />);

    const techGroup = screen.getByRole('group', { name: 'Фильтр по чипу' });
    fireEvent.click(within(techGroup).getByRole('button', { name: 'ESP' }));

    expect(screen.queryByRole('heading', { name: 'ThinkNode M1' })).not.toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'T-LoRa Pager' })).toBeInTheDocument();
  });

  it('applies combined category and tech filters', () => {
    render(<PortableCopyCatalog />);

    fireEvent.click(screen.getByRole('button', { name: 'Платы' }));

    const techGroup = screen.getByRole('group', { name: 'Фильтр по чипу' });
    fireEvent.click(within(techGroup).getByRole('button', { name: 'NRF' }));

    expect(screen.getByRole('region', { name: 'Платы' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'FakeTec V5.5' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { name: 'ThinkNode M1' })).not.toBeInTheDocument();
  });

  it('exposes aria-pressed state on filter buttons', () => {
    render(<PortableCopyCatalog />);

    // Category "Все" is pressed by default — find it within the category group
    const categoryGroup = screen.getByRole('group', { name: 'Фильтр по типу' });
    expect(within(categoryGroup).getByRole('button', { name: 'Все' })).toHaveAttribute('aria-pressed', 'true');

    // Click NRF in the tech group and check it becomes pressed
    const techGroup = screen.getByRole('group', { name: 'Фильтр по чипу' });
    fireEvent.click(within(techGroup).getByRole('button', { name: 'NRF' }));
    expect(within(techGroup).getByRole('button', { name: 'NRF' })).toHaveAttribute('aria-pressed', 'true');
  });

  it('renders device description text', () => {
    render(<PortableCopyCatalog />);

    expect(screen.getByText('Низкое энергопотребление и дисплей E-Ink, который отлично читается на солнце и экономит батарею.')).toBeInTheDocument();
  });

  /* ── Sorting ───────────────────────────────────── */

  it('sorts by price ascending', () => {
    render(<PortableCopyCatalog />);

    // Filter to "Платы" so we have a manageable subset
    fireEvent.click(screen.getByRole('button', { name: 'Платы' }));

    // Change sort to "Сначала дешевле"
    const sortSelect = screen.getByRole('combobox', { name: 'Сортировка' });
    fireEvent.change(sortSelect, { target: { value: 'price-asc' } });

    // Get all card headings within the boards section
    const boardsSection = screen.getByRole('region', { name: 'Платы' });
    const headings = within(boardsSection).getAllByRole('heading', { level: 3 });
    const titles = headings.map((h) => h.textContent);

    // First card should be the cheapest (≈ 1 300 ₽)
    expect(titles[0]).toBe('Heltec Wireless Stick Lite / Mesh Nod');
  });

  it('sorts by price ascending across all categories when category filter is "Все"', () => {
    render(<PortableCopyCatalog />);

    // Change sort to "Сначала дешевле" without narrowing categories
    const sortSelect = screen.getByRole('combobox', { name: 'Сортировка' });
    fireEvent.change(sortSelect, { target: { value: 'price-asc' } });

    // We should now have a single combined section
    expect(screen.queryByRole('region', { name: 'Готовые' })).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Солнечные' })).not.toBeInTheDocument();
    expect(screen.queryByRole('region', { name: 'Платы' })).not.toBeInTheDocument();

    const allSection = screen.getByRole('region', { name: 'Все устройства' });
    const headings = within(allSection).getAllByRole('heading', { level: 3 });
    const titles = headings.map((h) => h.textContent);

    expect(titles[0]).toBe('Heltec Wireless Stick Lite / Mesh Nod');
  });

  it('sorts by price descending', () => {
    render(<PortableCopyCatalog />);

    fireEvent.click(screen.getByRole('button', { name: 'Платы' }));

    const sortSelect = screen.getByRole('combobox', { name: 'Сортировка' });
    fireEvent.change(sortSelect, { target: { value: 'price-desc' } });

    const boardsSection = screen.getByRole('region', { name: 'Платы' });
    const headings = within(boardsSection).getAllByRole('heading', { level: 3 });
    const titles = headings.map((h) => h.textContent);

    // First card should be the most expensive in boards (≈ 3 900 ₽)
    expect(titles[0]).toBe('Wio Tracker L1 E-ink');
  });

  /* ── Purchase dialog ───────────────────────────── */

  it('opens purchase confirm dialog when clicking "Купить" on a purchaseConfirm device', () => {
    render(<PortableCopyCatalog />);

    clickBuyForDevice('T-Beam 1W');

    const dialog = screen.getByRole('dialog');
    expect(dialog).toBeInTheDocument();
    expect(screen.getByText('Внимание: повышенная мощность')).toBeInTheDocument();
  });

  it('closes purchase dialog on Escape', () => {
    render(<PortableCopyCatalog />);

    clickBuyForDevice('T-Beam 1W');

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('closes purchase dialog on cancel button click', () => {
    render(<PortableCopyCatalog />);

    clickBuyForDevice('T-Beam 1W');

    expect(screen.getByRole('dialog')).toBeInTheDocument();

    fireEvent.click(screen.getByText('Отмена'));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('calls window.open on confirm and closes dialog', () => {
    const openSpy = vi.spyOn(window, 'open').mockImplementation(() => null);
    render(<PortableCopyCatalog />);

    clickBuyForDevice('T-Beam 1W');

    fireEvent.click(screen.getByText('Подтверждаю и перейти'));

    expect(openSpy).toHaveBeenCalledOnce();
    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

    openSpy.mockRestore();
  });

  /* ── Empty state ───────────────────────────────── */

  it('shows empty state message when filter combination yields no results', async () => {
    // Clear module cache so the dynamic import picks up the mock
    vi.resetModules();

    // Mock DEVICE_DATA with empty categories to trigger the empty state
    vi.doMock('./portable-catalog/data', () => ({
      DEVICE_CATEGORY_LABELS: {
        universal: 'Готовые',
        solar: 'Солнечные',
        boards: 'Платы',
      },
      DEVICE_DATA: {
        universal: [],
        solar: [],
        boards: [],
      },
    }));

    // Re-import the component with the mocked data
    const { default: CatalogWithEmptyData } = await import('./PortableCopyCatalog');

    render(<CatalogWithEmptyData />);

    expect(screen.getByText('Нет устройств для выбранных фильтров.')).toBeInTheDocument();

    vi.doUnmock('./portable-catalog/data');
  });

  /* ── Featured section ──────────────────────────── */

  it('renders the featured "Выбор сообщества" section', async () => {
    render(<PortableCopyCatalog />);

    expect(screen.getByRole('region', { name: 'Выбор сообщества' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Выбор сообщества' })).toBeInTheDocument();
    // Popular devices should be in featured section
    expect(await screen.findByRole('heading', { name: 'Heltec WiFi LoRa 32 (V3)' })).toBeInTheDocument();
  });

  it('limits section cards on mobile until the user expands the section', async () => {
    mockMatchMedia(true);
    const visibleBoardDevices = DEVICE_DATA.boards.filter((device) => !device.popular);

    render(<PortableCopyCatalog />);

    fireEvent.click(screen.getByRole('button', { name: 'Платы' }));

    const boardsSection = screen.getByRole('region', { name: 'Платы' });

    await waitFor(() => {
      expect(within(boardsSection).getAllByRole('heading', { level: 3 })).toHaveLength(6);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Показать все устройства в разделе Платы' }));

    await waitFor(() => {
      expect(within(boardsSection).getAllByRole('heading', { level: 3 })).toHaveLength(visibleBoardDevices.length);
    });

    fireEvent.click(screen.getByRole('button', { name: 'Свернуть раздел Платы' }));

    await waitFor(() => {
      expect(within(boardsSection).getAllByRole('heading', { level: 3 })).toHaveLength(6);
    });
  });

  it('keeps only the first mobile catalog image eager on the initial render', () => {
    mockMatchMedia(true);

    render(<PortableCopyCatalog />);

    const eagerImages = screen
      .getAllByRole('img')
      .filter((image) => image.getAttribute('loading') === 'eager');

    expect(eagerImages).toHaveLength(1);
  });
});
