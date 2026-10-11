import { expect, test } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile', width: 360, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
] as const;

const THEMES = ['light', 'dark'] as const;

const HIDE_DEV_TOOLS =
  '[data-nextjs-dev-tools-button], [data-nextjs-dev-tools-overlay] { display: none !important; }';

for (const viewport of VIEWPORTS) {
  for (const theme of THEMES) {
    test(`home page ${viewport.name} ${theme}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      // Reduced motion disables the hero autoplay and AgentFlow pulse so the
      // screenshot is deterministic.
      await page.emulateMedia({ colorScheme: theme, reducedMotion: 'reduce' });
      await page.goto('/');
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      await page.addStyleTag({ content: HIDE_DEV_TOOLS });
      await expect(page).toHaveScreenshot(
        `home-${viewport.name}-${theme}.png`,
        {
          fullPage: true,
        },
      );
    });
  }
}
