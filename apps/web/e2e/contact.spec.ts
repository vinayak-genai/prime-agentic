import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('contact page renders and prefills the platform', async ({ page }) => {
  await page.goto('/contact?platform=financial-planner');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Request a demo',
  );
  await expect(page.locator('select[name="platform"]')).toHaveValue(
    'financial-planner',
  );
});

test('contact page has no axe violations', async ({ page }) => {
  await page.goto('/contact');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('shows an error summary and focuses it on invalid submit', async ({
  page,
}) => {
  await page.goto('/contact');
  const form = page.locator('form');
  await form.getByRole('button', { name: 'Request a demo' }).click();
  const summary = page.getByRole('alert').filter({ hasText: 'Please fix' });
  await expect(summary).toBeVisible();
  await expect(summary).toBeFocused();
});

test('submits successfully when the API responds 201', async ({ page }) => {
  await page.route('**/demo-requests', (route) =>
    route.fulfill({
      status: 201,
      contentType: 'application/json',
      body: '{"ok":true}',
    }),
  );
  await page.goto('/contact');
  const form = page.locator('form');
  await form.getByLabel('Name').fill('Ada Lovelace');
  await form.getByLabel('Work email').fill('ada@example.com');
  await form.getByLabel('Company').fill('Acme');
  await form
    .getByLabel('What would you like to explore?')
    .fill('Retirement planning');
  await form.getByRole('checkbox').check();
  await form.getByRole('button', { name: 'Request a demo' }).click();
  await expect(page.getByText(/we received your request/i)).toBeVisible();
});
