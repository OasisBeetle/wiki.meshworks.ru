import { expect, test, type Locator, type Page } from '@playwright/test';

async function openAndReload(page: Page, url: string, viewport: { width: number; height: number }) {
  await page.setViewportSize(viewport);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.reload({ waitUntil: 'networkidle' });
}

async function visibleVariantNames(page: Page): Promise<string[]> {
  return page.locator('[data-search-variant]').evaluateAll((nodes) =>
    nodes
      .filter((node) => {
        const element = node as HTMLElement;
        const styles = window.getComputedStyle(element);
        return styles.display !== 'none' && styles.visibility !== 'hidden' && element.getClientRects().length > 0;
      })
      .map((node) => node.getAttribute('data-search-variant') ?? ''),
  );
}

async function visibleControlCount(page: Page): Promise<number> {
  return page
    .locator(
      [
        '[data-search-variant="desktop"] .DocSearch-Button',
        '[data-search-variant="desktop"] .navbar__search-input',
        '[data-search-variant="mobile"] .mwMobileSearchTrigger',
      ].join(', '),
    )
    .evaluateAll((nodes) =>
      nodes.filter((node) => {
        const element = node as HTMLElement;
        const styles = window.getComputedStyle(element);
        return styles.display !== 'none' && styles.visibility !== 'hidden' && element.getClientRects().length > 0;
      }).length,
    );
}

async function expectSingleVisibleSearchVariant(page: Page, variant: 'desktop' | 'mobile') {
  const desktop = page.locator('[data-search-variant="desktop"]');
  const mobile = page.locator('[data-search-variant="mobile"]');

  if (variant === 'desktop') {
    await expect(desktop).toBeVisible();
    await expect(mobile).toBeHidden();
  } else {
    await expect(mobile).toBeVisible();
    await expect(desktop).toBeHidden();
  }

  expect(await visibleVariantNames(page)).toEqual([variant]);
  expect(await visibleControlCount(page)).toBe(1);
}

async function assertSearchPageNavigation(link: Locator, page: Page) {
  await link.click();
  await expect(page).toHaveURL(/\/search$/);
}

test('desktop navbar search', async ({ page }) => {
  await openAndReload(page, '/introduction', { width: 1280, height: 900 });

  await expectSingleVisibleSearchVariant(page, 'desktop');
});

test('mobile navbar search', async ({ page }) => {
  await openAndReload(page, '/introduction', { width: 390, height: 844 });

  await expectSingleVisibleSearchVariant(page, 'mobile');
  await assertSearchPageNavigation(page.getByRole('link', { name: 'Открыть поиск' }), page);
});

test('shared layout smoke', async ({ page }) => {
  await openAndReload(page, '/about', { width: 1280, height: 900 });

  await expectSingleVisibleSearchVariant(page, 'desktop');
});
