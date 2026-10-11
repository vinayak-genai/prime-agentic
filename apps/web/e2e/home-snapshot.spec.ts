import { expect, test } from '@playwright/test';

const VIEWPORTS = [
  { name: 'mobile', width: 360, height: 800 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
] as const;

const THEMES = ['light', 'dark'] as const;

const FREEZE_ANIMATIONS =
  '*, *::before, *::after { animation: none !important; transition: none !important; }';

for (const viewport of VIEWPORTS) {
  for (const theme of THEMES) {
    test(`home page ${viewport.name} ${theme}`, async ({ page }) => {
      await page.setViewportSize({
        width: viewport.width,
        height: viewport.height,
      });
      await page.emulateMedia({ colorScheme: theme });
      await page.goto('/');
      // Freeze the AgentFlow animation so snapshots are deterministic.
      await page.addStyleTag({ content: FREEZE_ANIMATIONS });
      // Pause the hero autoplay so the slide doesn't advance mid-screenshot.
      const autoplay = page.getByRole('button', { name: 'Autoplay' });
      if (await autoplay.count()) {
        await autoplay.click();
      }
      await expect(page).toHaveScreenshot(
        `home-${viewport.name}-${theme}.png`,
        { fullPage: true },
      );
    });
  }
}
