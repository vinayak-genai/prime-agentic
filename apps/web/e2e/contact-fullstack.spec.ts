import { expect, test } from '@playwright/test';

// Runs only in CI where the API + Postgres are started (FULL_STACK=1).
const FULL_STACK = process.env.FULL_STACK === '1';

test('submits a demo request end-to-end (form -> API -> DB)', async ({
  page,
}) => {
  test.skip(!FULL_STACK, 'requires the API + Postgres');

  const email = `ada+${Date.now()}@example.com`;
  await page.goto('/contact?platform=financial-planner');
  const form = page.locator('form');
  await form.getByLabel('Name').fill('Ada Lovelace');
  await form.getByLabel('Work email').fill(email);
  await form.getByLabel('Company').fill('Acme');
  await form
    .getByLabel('What would you like to explore?')
    .fill('Retirement planning');
  await form.getByRole('checkbox').check();
  await form.getByRole('button', { name: 'Request a demo' }).click();

  await expect(page.getByText(/we received your request/i)).toBeVisible();
});
