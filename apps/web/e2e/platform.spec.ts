import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('financial planner page renders', async ({ page }) => {
  await page.goto('/platforms/financial-planner');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Personalized financial planning',
  );
});

test('financial planner page has no axe violations (light)', async ({
  page,
}) => {
  await page.goto('/platforms/financial-planner');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('financial planner page has no axe violations (dark)', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/platforms/financial-planner');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('demo advances and returns between steps', async ({ page }) => {
  await page.goto('/platforms/financial-planner');
  await expect(page.getByText('Step 1 of 4', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByText('Step 2 of 4', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.getByText('Step 1 of 4', { exact: true })).toBeVisible();
});

test('FAQ items toggle open', async ({ page }) => {
  await page.goto('/platforms/financial-planner');
  const details = page.locator('details').first();
  await expect(details).not.toHaveAttribute('open', '');
  await details.locator('summary').click();
  await expect(details).toHaveAttribute('open', '');
});

test('disclaimer is present', async ({ page }) => {
  await page.goto('/platforms/financial-planner');
  await expect(
    page
      .getByText(
        'Illustrative demo only. Not financial advice. Consult a licensed advisor.',
      )
      .first(),
  ).toBeVisible();
});

test('CTA links carry the platform slug', async ({ page }) => {
  await page.goto('/platforms/financial-planner');
  await expect(
    page.locator('a[href="/contact?platform=financial-planner"]'),
  ).toHaveCount(2);
});

test('unknown slug returns 404', async ({ page }) => {
  const response = await page.goto('/platforms/does-not-exist');
  expect(response?.status()).toBe(404);
});

test('platform without content falls back to coming soon', async ({ page }) => {
  await page.goto('/platforms/recruitment-ats');
  await expect(
    page.getByRole('heading', { name: 'Recruitment ATS' }),
  ).toBeVisible();
});
