import { expect, browser, $, $$ } from '@wdio/globals';
import SignUpPage from '../pageobjects/SignupPage.js';
import HomePage from '../pageobjects/HomePage.js';
import { faker } from '@faker-js/faker';
import { signupData } from '../data/signup.data.js';


const email = faker.internet.email();
const name = faker.person.firstName();

describe('Telnyx Sign-Up Functionality', () => {
    beforeEach(async () => {
        await HomePage.visit();
        await HomePage.navigateToSignUp();
    });

    it('should display the registration form', async () => {
        await SignUpPage.verifyRegistrationFormVisible();
    });

    it('should register successfully with valid data', async () => {
        await SignUpPage.fillRegistrationForm(signupData.validCredentials);
        await SignUpPage.submitRegistrationForm();
        await $(SignUpPage.elements.lastNameInput).setValue(name);
        await browser.pause(1000);
        await SignUpPage.submitRegistrationForm();
        await SignUpPage.verifySuccessfulRegistration();
    });

    it('should show errors during registration with invalid data', async () => {
        await SignUpPage.fillRegistrationForm(signupData.invalidCredentials);
        await SignUpPage.submitRegistrationForm();
        await SignUpPage.verifyErrorMessage(
            'That email and password combination is not valid, or your browser could not be authenticated via recaptcha. Please try again.'
        );
    });
});