import { expect, test } from '@playwright/test';
import { FINANCIAL_DISCLAIMER } from '../src/content/disclaimer';

test('financial planner page renders', async ({ page }) => {
  await page.goto('/platforms/financial-planner');
  await expect(page.getByRole('heading', { level: 1 })).toContainText(
    'Personalized financial planning',
  );
});

test('demo advances and returns between steps', async ({ page }) => {
  await page.goto('/platforms/financial-planner');
  await expect(page.getByText('Step 1 of 4', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Next', exact: true }).click();
  await expect(page.getByText('Step 2 of 4', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Back', exact: true }).click();
  await expect(page.getByText('Step 1 of 4', { exact: true })).toBeVisible();
});

test('demo steps follow the required order', async ({ page }) => {
  await page.goto('/platforms/financial-planner');
  const next = page.getByRole('button', { name: 'Next', exact: true });
  const expected = [
    'Upload portfolio',
    'Scenario review',
    'Plan adjustments',
    'Plan summary',
  ];
  for (const title of expected) {
    await expect(page.getByRole('heading', { name: title })).toBeVisible();
    if (title !== 'Plan summary') await next.click();
  }
  await expect(next).toBeDisabled();
});

test('demo is keyboard operable and announces each step', async ({ page }) => {
  await page.goto('/platforms/financial-planner');
  const live = page.locator('[aria-live="polite"]').filter({ hasText: 'Step' });
  const label = page.getByText('Mock demo, illustrative data');
  const next = page.getByRole('button', { name: 'Next', exact: true });
  const back = page.getByRole('button', { name: 'Back', exact: true });

  await expect(page.getByText('Step 1 of 4', { exact: true })).toBeVisible();
  await expect(live).toHaveText('Step 1 of 4: Upload portfolio');
  await expect(label).toBeVisible();

  await next.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Step 2 of 4', { exact: true })).toBeVisible();
  await expect(live).toHaveText('Step 2 of 4: Scenario review');

  await next.focus();
  await page.keyboard.press('Space');
  await expect(page.getByText('Step 3 of 4', { exact: true })).toBeVisible();
  await expect(live).toHaveText('Step 3 of 4: Plan adjustments');

  await back.focus();
  await page.keyboard.press('Enter');
  await expect(page.getByText('Step 2 of 4', { exact: true })).toBeVisible();
  await expect(live).toHaveText('Step 2 of 4: Scenario review');

  await expect(label).toBeVisible();
});

test('FAQ items toggle open', async ({ page }) => {
  await page.goto('/platforms/financial-planner');
  const details = page.locator('details').first();
  await expect(details).not.toHaveAttribute('open', '');
  await details.locator('summary').click();
  await expect(details).toHaveAttribute('open', '');
});

test('FAQ items support multi-open', async ({ page }) => {
  await page.goto('/platforms/financial-planner');
  const items = page.locator('details');
  await items.nth(0).locator('summary').click();
  await items.nth(1).locator('summary').click();
  await expect(items.nth(0)).toHaveAttribute('open', '');
  await expect(items.nth(1)).toHaveAttribute('open', '');
});

// --- Amendment checks -------------------------------------------------------

test('disclaimer appears in hero, beside the demo, and the page footer', async ({
  page,
}) => {
  await page.goto('/platforms/financial-planner');
  const occurrences = page.getByText(FINANCIAL_DISCLAIMER, { exact: true });
  await expect(occurrences.first()).toBeVisible();
  expect(await occurrences.count()).toBeGreaterThanOrEqual(3);
});

test('footer shows the full disclaimer on platform pages that set it', async ({
  page,
}) => {
  await page.goto('/platforms/financial-planner');
  await expect(page.locator('footer')).toContainText(FINANCIAL_DISCLAIMER);
});

test('footer keeps the one-liner on pages without a disclaimer', async ({
  page,
}) => {
  await page.goto('/');
  const footer = page.locator('footer');
  await expect(footer).toContainText('Not financial advice.');
  await expect(footer).not.toContainText(FINANCIAL_DISCLAIMER);
});

test('CTA links carry the platform slug', async ({ page }) => {
  await page.goto('/platforms/financial-planner');
  const ctas = page.locator('a[href="/contact?platform=financial-planner"]');
  await expect(ctas).toHaveCount(2);
  for (const cta of await ctas.all()) {
    await expect(cta).toHaveAttribute(
      'href',
      '/contact?platform=financial-planner',
    );
  }
});

test('how it works uses numbered steps, not AgentFlow', async ({ page }) => {
  await page.goto('/platforms/financial-planner');
  const section = page
    .locator('section')
    .filter({ has: page.getByRole('heading', { name: 'Three steps' }) });
  const steps = section.locator('ol li');
  await expect(steps).toHaveCount(3);
  await expect(steps.nth(0)).toContainText('Plan');
  await expect(steps.nth(1)).toContainText('Execute');
  await expect(steps.nth(2)).toContainText('Adapt');
  // AgentFlow renders generic agent roles; the numbered-steps section must not.
  await expect(section).not.toContainText('Planner');
  await expect(section).not.toContainText('Executor');
  await expect(section).not.toContainText('Adapter');
});

test('no FAQPage JSON-LD is emitted', async ({ page }) => {
  await page.goto('/platforms/financial-planner');
  const scripts = page.locator('script[type="application/ld+json"]');
  const count = await scripts.count();
  for (let i = 0; i < count; i++) {
    const text = (await scripts.nth(i).textContent()) ?? '';
    expect(text).not.toContain('FAQPage');
  }
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

test('coming soon page is noindex', async ({ page }) => {
  await page.goto('/platforms/recruitment-ats');
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
    'content',
    /noindex/,
  );
});

test('main landmark and footer render across page states', async ({ page }) => {
  for (const path of [
    '/platforms/financial-planner',
    '/platforms/recruitment-ats',
    '/platforms/does-not-exist',
  ]) {
    await page.goto(path);
    await expect(page.locator('main#main-content')).toHaveCount(1);
    await expect(page.locator('footer')).toHaveCount(1);
  }
});
