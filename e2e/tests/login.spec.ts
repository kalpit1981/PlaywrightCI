import { test } from '../../fixtures/loginFixture';
import { readCSV } from '../../utils/csvReader';

const loginCSV = readCSV('test-data/login.csv');

test.describe('SauceDemo Login Tests', () => {
  for (const data of loginCSV) {
    if (data.run.trim().toLowerCase() !== 'true') {
      continue;
    }

    test(`Login test for ${data.username}`, async ({ loginPage }) => {
      await loginPage.navigateToLoginPage();
      await loginPage.verifyPageTitle();
      await loginPage.login(data.username, data.password);

      if (data.expected === 'success') {
        await loginPage.verifySuccessfulLogin();
      } else {
        await loginPage.verifyLoginError();
      }
    });
  }
});