import { expect, browser, $, $$ } from '@wdio/globals';

class LoginPage {
   
    elements = {
        loginForm: 'form[aria-label="loginForm"]',
        emailInput: 'input[name="email"]',
        passwordInput: 'input[name="password"]',
        submitButton: 'form[aria-label="loginForm"] button',
        errorAlert: '.MuiAlert-message',
        validationErrors: {
            labels: 'label.Mui-error',
            messages: 'p.Mui-error',
        },
        twoFactorMessage: 'div[data-testid="login.signin.subtitle"]',
        loginPageUrl: '/#/login/sign-in'
    };

// async verifyLoginPageUrl() {
//     await expect(browser).toHaveUrlContaining(this.elements.loginPageUrl);
// }
async verifyLoginPageUrl() {
    const currentUrl = await browser.getUrl();
    await expect(currentUrl).toContain(this.elements.loginPageUrl);
}

async typeEmail(email) {
    const emailInput = await $(this.elements.emailInput);
    await emailInput.setValue(email);
}

async typePassword(password) {
    const passwordInput = await $(this.elements.passwordInput);
    await passwordInput.setValue(password);
}

async clickSubmit() {
    const submitButton = $(this.elements.submitButton);
    await submitButton.click();
}

async login(email, password) {
    await this.typeEmail(email);
    await this.typePassword(password);
    await this.clickSubmit();
}

async verifyFormVisible() {
    await expect($(this.elements.loginForm)).toBeDisplayed();
    await expect($(this.elements.emailInput)).toBeDisplayed();
    await expect($(this.elements.passwordInput)).toBeDisplayed();
    await expect($(this.elements.submitButton)).toBeDisplayed();
}

async verifySuccessfulLogin() {
    await this.verifyLoginPageUrl();
    const twoFactorMessage = await $(this.elements.twoFactorMessage);
    await expect(twoFactorMessage).toHaveText('Secure your account with Two-Factor');
}

async verifyInvalidCredentialsError() {
    await expect($(this.elements.errorAlert)).toBeDisplayed();
    await this.verifyLoginPageUrl();
}

async verifyBlankFormErrors() {
    await expect($(this.elements.emailInput)).toHaveAttribute('aria-invalid', 'true');
    await expect($(this.elements.passwordInput)).toHaveAttribute('aria-invalid', 'true');

    const labels = await $$(this.elements.validationErrors.labels);
    for (const label of labels) {
        await expect(label).toBeDisplayed();
    }

    const messages = await $$(this.elements.validationErrors.messages);
    for (const message of messages) {
        await expect(message).toHaveText('Required');
    }
}
}

export default new LoginPage();
