import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('carousel exposes ARIA semantics', async ({ page }) => {
  await page.goto('/carousel');
  const region = page.getByRole('region', { name: 'Cards example' });
  await expect(region).toHaveAttribute('aria-roledescription', 'carousel');
  await expect(region.getByRole('group').first()).toHaveAttribute(
    'aria-roledescription',
    'slide',
  );
});

test('next button advances the carousel', async ({ page }) => {
  await page.goto('/carousel');
  const region = page.getByRole('region', { name: 'Cards example' });
  await region.getByRole('button', { name: 'Next slide' }).click();
  await expect(
    region.getByRole('button', { name: 'Go to slide 2' }),
  ).toHaveAttribute('aria-current', 'true');
});

test('carousel page has no axe violations', async ({ page }) => {
  await page.goto('/carousel');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});
