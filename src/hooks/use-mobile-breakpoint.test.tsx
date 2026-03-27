import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { getMobileMatch, MOBILE_MEDIA_QUERY, useMobileBreakpoint } from './use-mobile-breakpoint';

const originalMatchMedia = window.matchMedia;

type MockMediaQueryList = MediaQueryList & {
  dispatch: (nextMatches: boolean) => void;
};

function mockMatchMedia(initialMatches: boolean, options?: { legacy?: boolean }): MockMediaQueryList {
  let matches = initialMatches;
  const listeners = new Set<(event: MediaQueryListEvent) => void>();
  const legacy = options?.legacy === true;

  const mediaQueryList = {
    get matches() {
      return matches;
    },
    media: MOBILE_MEDIA_QUERY,
    onchange: null,
    addEventListener: legacy
      ? undefined
      : vi.fn((eventName: string, listener: (event: MediaQueryListEvent) => void) => {
          if (eventName === 'change') {
            listeners.add(listener);
          }
        }),
    removeEventListener: legacy
      ? undefined
      : vi.fn((eventName: string, listener: (event: MediaQueryListEvent) => void) => {
          if (eventName === 'change') {
            listeners.delete(listener);
          }
        }),
    addListener: legacy
      ? vi.fn((listener: (event: MediaQueryListEvent) => void) => {
          listeners.add(listener);
        })
      : vi.fn(),
    removeListener: legacy
      ? vi.fn((listener: (event: MediaQueryListEvent) => void) => {
          listeners.delete(listener);
        })
      : vi.fn(),
    dispatchEvent: vi.fn(),
    dispatch(nextMatches: boolean) {
      matches = nextMatches;
      const event = { matches: nextMatches, media: MOBILE_MEDIA_QUERY } as MediaQueryListEvent;
      listeners.forEach((listener) => listener(event));
    },
  } as unknown as MockMediaQueryList;

  Object.defineProperty(window, 'matchMedia', {
    configurable: true,
    writable: true,
    value: vi.fn().mockImplementation((query: string) => {
      expect(query).toBe(MOBILE_MEDIA_QUERY);
      return mediaQueryList;
    }),
  });

  return mediaQueryList;
}

afterEach(() => {
  if (originalMatchMedia) {
    window.matchMedia = originalMatchMedia;
  } else {
    delete (window as Partial<Window>).matchMedia;
  }
});

describe('use-mobile-breakpoint', () => {
  it('returns false when matchMedia is unavailable', () => {
    delete (window as Partial<Window>).matchMedia;

    const { result } = renderHook(() => useMobileBreakpoint());

    expect(result.current).toBe(false);
    expect(getMobileMatch()).toBe(false);
  });

  it('syncs the hook state with the current media query match', async () => {
    mockMatchMedia(true);

    const { result } = renderHook(() => useMobileBreakpoint());

    await waitFor(() => {
      expect(result.current).toBe(true);
    });
    expect(getMobileMatch()).toBe(true);
  });

  it('updates when the media query match changes via addEventListener', async () => {
    const mediaQueryList = mockMatchMedia(false);
    const { result, unmount } = renderHook(() => useMobileBreakpoint());

    await waitFor(() => {
      expect(result.current).toBe(false);
    });

    act(() => {
      mediaQueryList.dispatch(true);
    });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    unmount();

    expect(mediaQueryList.addEventListener).toHaveBeenCalledWith('change', expect.any(Function));
    expect(mediaQueryList.removeEventListener).toHaveBeenCalledWith('change', expect.any(Function));
  });

  it('falls back to addListener/removeListener on legacy media query lists', async () => {
    const mediaQueryList = mockMatchMedia(false, { legacy: true });
    const { result, unmount } = renderHook(() => useMobileBreakpoint());

    act(() => {
      mediaQueryList.dispatch(true);
    });

    await waitFor(() => {
      expect(result.current).toBe(true);
    });

    unmount();

    expect(mediaQueryList.addListener).toHaveBeenCalledWith(expect.any(Function));
    expect(mediaQueryList.removeListener).toHaveBeenCalledWith(expect.any(Function));
  });
});
