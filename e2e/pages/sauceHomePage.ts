import { test, expect, Page, Locator } from '@playwright/test';
import loginData from '../../test-data/login.json'

export class SauceHomePage 
{
    readonly page: Page;
    readonly usernameInput:Locator;
    readonly passwordInput:Locator;
    readonly loginButton:Locator;
    
    constructor(page: Page) 
    {
        this.page = page;
        this.usernameInput = page.getByRole('textbox', { name: 'Username' });
        this.passwordInput = page.getByRole('textbox', { name: 'Password' });
        this.loginButton = page.getByRole('button', { name: 'Login' });
    }
}

export default SauceHomePage;


