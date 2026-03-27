import {expect, test, type Page} from '@playwright/test';

async function openAndReload(page: Page, url: string) {
  await page.setViewportSize({width: 1280, height: 900});
  await page.goto(url, {waitUntil: 'networkidle'});
  await page.reload({waitUntil: 'networkidle'});
}

test('docs sidebar renders metadata-driven icons and highlighted catalog link', async ({page}) => {
  await openAndReload(page, '/introduction');

  const sidebar = page.locator('.theme-doc-sidebar-menu');
  const catalogLink = sidebar.locator('.menu__link[data-sidebar-variant="catalog-highlight"]').first();

  await expect(sidebar.locator('[data-sidebar-icon="menu_book"]').first()).toBeVisible();
  await expect(sidebar.locator('[data-sidebar-icon="schema"]').first()).toBeVisible();
  await expect(catalogLink).toBeVisible();
  await expect(catalogLink).toContainText('Каталог устройств');
  await expect(catalogLink.locator('[data-sidebar-icon="inventory_2"]')).toBeVisible();
});
