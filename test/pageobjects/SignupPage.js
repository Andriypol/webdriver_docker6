import { browser, $, $$ } from '@wdio/globals';

class SignUpPage {
    elements = {
        registrationForm: 'form',
        emailLabel: 'label[for="email"]',
        firstNameLabel: 'label[for="first_name"]',
        lastNameLabel: 'label[for="last_name"]',
        passwordLabel: 'label[for="password"]',
        firstNameInput: 'input[name="first_name"]',
        lastNameInput: 'input[name="last_name"]',
        emailInput: 'input[name="email"]',
        passwordInput: 'input[name="password"]',
        termsAndConditionsCheckbox: '#terms_and_conditions',
        submitButton: 'button[type="submit"]',
        errorMessage: '.c-UUKrH-kDyeyw-type-error',
        verificationHeading: 'h1 span',
    };

async verifyRegistrationFormVisible() {
    await expect($(this.elements.registrationForm)).toBeDisplayed();
    await expect($(this.elements.emailLabel)).toHaveText('Company email');
    await expect($(this.elements.firstNameLabel)).toHaveText('First name');
    await expect($(this.elements.lastNameLabel)).toHaveText('Last name');
    await expect($(this.elements.passwordLabel)).toHaveText('Password');
    await expect($(this.elements.firstNameInput)).toBeDisplayed();
    await expect($(this.elements.lastNameInput)).toBeDisplayed();
    await expect($(this.elements.emailInput)).toBeDisplayed();
    await expect($(this.elements.passwordInput)).toBeDisplayed();
    await expect($(this.elements.submitButton)).toBeDisplayed();
}

async fillRegistrationForm({ firstName, lastName, email, password, acceptTerms = false }) {
    await $(this.elements.firstNameInput).setValue(firstName);
    await $(this.elements.lastNameInput).setValue(lastName);
    await $(this.elements.emailInput).setValue(email);
    await $(this.elements.passwordInput).setValue(password);
    if (acceptTerms) {
        await $(this.elements.termsAndConditionsCheckbox).click();
    }
}

async submitRegistrationForm() {
    await $(this.elements.submitButton).click();
}

async verifySuccessfulRegistration() {
    await expect(browser).toHaveUrl('https://telnyx.com/sign-up/verify-email');
    await expect($(this.elements.verificationHeading)).toHaveText('One last step');
}

async verifyErrorMessage(expectedMessage) {
    await expect($(this.elements.errorMessage)).toHaveText(expectedMessage);
}
}

export default new SignUpPage();