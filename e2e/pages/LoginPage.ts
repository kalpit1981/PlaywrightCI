
import { Page, Locator, expect } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly usernameInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly errorMessage: Locator;

  constructor(page: Page) {
    this.page = page;

    this.usernameInput = page.getByRole('textbox', {
      name: 'Username'
    });

    this.passwordInput = page.getByRole('textbox', {
      name: 'Password'
    });

    this.loginButton = page.getByRole('button', {
      name: 'Login'
    });

    this.errorMessage = page.locator('[data-test="error"]');
  }

  async navigateToLoginPage(): Promise<void> {
    await this.page.goto(`${process.env.BaseURL}`);
  }

  async verifyPageTitle(): Promise<void> {
    await expect(this.page).toHaveTitle(/Swag Labs/);
  }

  async login(username: string, password: string): Promise<void> {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async verifySuccessfulLogin(): Promise<void> {
    await expect(this.page).toHaveURL(/inventory\.html$/, {
      timeout: 10000
    });
  }

  async verifyLoginError(): Promise<void> {
    await expect(this.errorMessage).toBeVisible();
  }
}
