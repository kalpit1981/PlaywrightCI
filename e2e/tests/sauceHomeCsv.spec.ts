import { test, expect } from '@playwright/test';
import { readCSV } from '../../utils/csvReader';

const loginCSV = readCSV('test-data/login.csv');


loginCSV.forEach((data:any) => 
{
  if(data.run!=='true')
  return;
  test.describe('SauceDemo Homepage Login with Csv Data', () => 
  {
      test(`Login Tests for ${data.username}`, async ({ page }) => {
          await page.goto(`${process.env.BaseURL}`);
        
          // Expect a title "to contain" a substring.
          await expect(page).toHaveTitle(/Swag Labs/);

          await page.getByRole('textbox', { name: 'Username' }).fill(data.username);
          await page.getByRole('textbox', { name: 'Password' }).fill(data.password);
          await page.getByRole('button', { name: 'Login' }).click();
          
          if(data.expected==='success')
          {
            await expect(page).toHaveURL(`${process.env.BaseURL}/inventory.html`,{ timeout: 10000 });
          }
          else
          {
            await expect(page.locator('[data-test="error"]')).toBeVisible();
          }
          page.close()
        });

    });
})


