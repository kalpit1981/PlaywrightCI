import { test, expect } from '@playwright/test';
import loginData from '../../test-data/login.json'

loginData.forEach((data) => 
{
  if(!data.run)
  return;
  test.describe('SauceDemo Homepage Login with Json Data', () => 
  {
      test(`Login Tests for ${data.username}`, async ({ page }) => {
          await page.goto('https://www.saucedemo.com/');
        
          // Expect a title "to contain" a substring.
          await expect(page).toHaveTitle(/Swag Labs/);

          await page.getByRole('textbox', { name: 'Username' }).fill(data.username);
          await page.getByRole('textbox', { name: 'Password' }).fill(data.password);
          await page.getByRole('button', { name: 'Login' }).click();
          
          if(data.expected==="success")
          {
            await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html',{ timeout: 10000 });
          }
          else
          {
            await expect(page.locator('[data-test="error"]')).toBeVisible();
          }
          page.close()
        });

    });
})


test.describe('SauceDemo Homepage Login with JSON Data Using forEach', () => {

  loginData.forEach((data) => 
{
    if (!data.run) {
      return;
    }

    test(`Login test for ${data.username}`, async ({ page }) => {
      await page.goto('https://www.saucedemo.com/');

      // Verify the page title
      await expect(page).toHaveTitle(/Swag Labs/);

      // Enter login credentials
      await page.getByRole('textbox', { name: 'Username' })
        .fill(data.username);

      await page.getByRole('textbox', { name: 'Password' })
        .fill(data.password);

      await page.getByRole('button', { name: 'Login' }).click();

      if (data.expected === 'success') {
        // Wait for successful login, including slow users
        await expect(page).toHaveURL(
          'https://www.saucedemo.com/inventory.html',
          { timeout: 30000 }
        );

        await expect(
          page.getByText('Products', { exact: true })
        ).toBeVisible();

      } else {
        // Verify that a login error appears
        await expect(
          page.locator('[data-test="error"]')
        ).toBeVisible();
      }
      page.close()
    });
    
});

});
