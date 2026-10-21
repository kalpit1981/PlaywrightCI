import { test, expect } from '@playwright/test';

test.describe('Playwright Homepage Title Compare', () => {
  console.log('Test case 1 started.....')  
  test('has title', async ({ page }) => {
      await page.goto('/');

      // Expect a title "to contain" a substring.
      await expect(page).toHaveTitle(/Playwright/);
    });

});

test.describe('Playwright Homepage Verifying Installation Header', () => {
  console.log('Test case 2 started.....')  
  test('get started link', async ({ page }) => {
      await page.goto('/');

      // Click the get started link.
      await page.getByRole('link', { name: 'Get started' }).click();

      // Expects page to have a heading with the name of Installation.
      await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
    });
});

