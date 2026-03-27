import { expect, test, type Page } from '@playwright/test';

async function openAndReload(page: Page, url: string, viewport: { width: number; height: number }) {
  await page.setViewportSize(viewport);
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.reload({ waitUntil: 'networkidle' });
}

async function homepageStatOrder(page: Page): Promise<string[]> {
  return page.locator('[data-stat-item]').evaluateAll((nodes) =>
    nodes.map((node) => node.getAttribute('data-stat-item') ?? ''),
  );
}

test('homepage stat order is stable after hard reload', async ({ page }) => {
  await openAndReload(page, '/', { width: 1280, height: 900 });

  expect(await homepageStatOrder(page)).toEqual(['devices', 'setup', 'basics', 'firmware']);

  await page.reload({ waitUntil: 'networkidle' });

  expect(await homepageStatOrder(page)).toEqual(['devices', 'setup', 'basics', 'firmware']);
});

test('homepage does not mount the network-map canvas on mobile', async ({ page }) => {
  await openAndReload(page, '/', { width: 390, height: 844 });
  await page.waitForTimeout(400);

  await expect(page.locator('canvas')).toHaveCount(0);
});
