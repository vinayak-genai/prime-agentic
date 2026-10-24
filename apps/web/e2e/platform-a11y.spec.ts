import { expect, test, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

async function assertNoViolations(page: Page, label: string) {
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations, `axe (${label})`).toEqual([]);
}

test('financial planner page has no axe violations (light)', async ({
  page,
}) => {
  await page.goto('/platforms/financial-planner');
  await assertNoViolations(page, 'light');
});

test('financial planner page has no axe violations (dark)', async ({
  page,
}) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/platforms/financial-planner');
  await assertNoViolations(page, 'dark');
});

test('financial planner page has no axe violations at every demo step', async ({
  page,
}) => {
  await page.goto('/platforms/financial-planner');
  const next = page.getByRole('button', { name: 'Next', exact: true });
  for (let step = 1; step <= 4; step++) {
    await assertNoViolations(page, `demo step ${step}`);
    if (await next.isEnabled()) await next.click();
  }
});

test('financial planner page has no axe violations with all FAQ open', async ({
  page,
}) => {
  await page.goto('/platforms/financial-planner');
  for (const summary of await page.locator('details summary').all()) {
    await summary.click();
  }
  await assertNoViolations(page, 'all FAQ open');
});

for (const slug of ['recruitment-ats', 'edtech-ai', 'iot']) {
  test(`${slug} page has no axe violations (light)`, async ({ page }) => {
    await page.goto(`/platforms/${slug}`);
    await assertNoViolations(page, slug);
  });
}

test('404 page has no axe violations', async ({ page }) => {
  await page.goto('/platforms/does-not-exist');
  await assertNoViolations(page, '404');
});
