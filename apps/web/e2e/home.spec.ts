import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

test('home page renders', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('main')).toBeVisible();
});

test('home page has no axe violations', async ({ page }) => {
  await page.goto('/');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('skip link targets main content', async ({ page }) => {
  await page.goto('/');
  await expect(
    page.getByRole('link', { name: 'Skip to content' }),
  ).toHaveAttribute('href', '#main-content');
});

test('theme toggle flips the theme', async ({ page }) => {
  await page.goto('/');
  const html = page.locator('html');
  await expect(html).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: 'Switch to dark mode' }).click();
  await expect(html).toHaveAttribute('data-theme', 'dark');
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(html).toHaveAttribute('data-theme', 'light');
});

test('platforms disclosure opens and closes with Escape', async ({ page }) => {
  await page.goto('/');
  const button = page.getByRole('button', { name: 'Platforms' });
  const menu = page.locator('#platforms-menu');
  const financialLink = menu.getByRole('link', {
    name: 'Financial Planner & Wealth Management',
  });
  await button.click();
  await expect(financialLink).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
});

test('mobile menu opens and returns focus on Escape', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto('/');
  const toggle = page.getByRole('button', { name: 'Open menu' });
  await toggle.click();
  const menu = page.locator('#mobile-menu');
  await expect(menu).toBeVisible();
  await expect(menu.getByRole('link', { name: 'About' })).toBeVisible();
  await page.keyboard.press('Escape');
  await expect(menu).toBeHidden();
  await expect(toggle).toBeFocused();
});

test('footer newsletter is disabled', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByLabel('Email address')).toBeDisabled();
});
