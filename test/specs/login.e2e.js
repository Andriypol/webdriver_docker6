import HomePage from '../pageobjects/HomePage.js';
import LoginPage from '../pageobjects/LoginPage.js';
import { expect, browser, $, $$ } from '@wdio/globals';


describe('Telnyx Log In Functionality', () => {
    const email = "bars22@yahoo.com";
    const password = "Password_123!";

    beforeEach(async () => {
        await HomePage.visit();
        await HomePage.clickOnLogin();
    });

    it('should display the login form', async () => {
        await LoginPage.verifyFormVisible();
    });

    it('should log in successfully with valid credentials', async () => {
        await LoginPage.login(email, password);
        await LoginPage.verifySuccessfulLogin();
    });

    it('should display an error for invalid credentials', async () => {
        await LoginPage.login('invalidvova@yahoo.com', 'Password_123!');
        await LoginPage.verifyInvalidCredentialsError();
    });

    it('should show error on submitting blank form', async () => {
        await $(LoginPage.elements.emailInput).click();
        await $(LoginPage.elements.passwordInput).click();
        await LoginPage.clickSubmit();
        await LoginPage.verifyBlankFormErrors();
    });
});