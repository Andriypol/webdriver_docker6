//import { browser, $, $$ } from '@wdio/globals';

class CheckoutPage {
    elements = {
        emailInput: 'input[name="email"]',
        //countryInput: 'select[name="countryCode"] option',
        firstnameInput: 'input[name="firstName"]',
        lastnameInput: 'input[name="lastName"]',
        addressInput: 'input[name="address1"]',
        cityInput: 'input[name="city"]',
        postInput: 'input[name="postalCode"]',
        phoneInput: 'input[name="phone"]',

        cardNumberIframe: 'iframe[title="Field container for: Card number"]',
        cardNumberInput: 'input[data-current-field="number"]',
        expDateIframe: 'iframe[title="Field container for: Expiration date (MM / YY)"]',
        expDateInput: 'input[name="expiry"]',
        //expDateInput: 'input[data-current-field="expiry"]',
        cvvIframe: 'iframe[title="Field container for: Security code"]',
        cvvInput: 'input[data-current-field="verification_value"]',
        nameOnCardIframe: 'iframe[title="Field container for: Name on card"]',
        nameOnCardInput: 'input[placeholder="Name on card"]',
        phoneRemember: 'input[placeholder="Mobile phone number"]',

        submitOrderButton: '#checkout-pay-button',
        cardErrorMessage: '#PaymentErrorBanner',
        cvvErrorMessage: '#error-for-verification_value',
    };
    
    getCountryInput(country) {
        return $('select[name="countryCode"] option[value="' + country + '"]');
    }

    async fillCheckoutForm({ email, country, firstname, lastname, address, city, zip, phone, cardNumber, expDate, cvv, nameoncard, phonefull }) {
        await (await $(this.elements.emailInput)).setValue(email);
        //await (await $(this.elements.countryInput)).selectByAttribute('value', 'UA');
        await (await this.getCountryInput(country)).click();
        await (await $(this.elements.firstnameInput)).setValue(firstname);
        await (await $(this.elements.lastnameInput)).setValue(lastname);
        await (await $(this.elements.addressInput)).setValue(address);
        await (await $(this.elements.cityInput)).setValue(city);
        await (await $(this.elements.postInput)).setValue(zip);
        await (await $(this.elements.phoneInput)).setValue(phone);
        
        //await $(this.elements.cardNumberIframe).waitForExist(5000);
        // Switch to Stripe iframe for Card Number input
        const cardNumberIframe = await $(this.elements.cardNumberIframe);
        await browser.switchToFrame(cardNumberIframe);
        await $(this.elements.cardNumberIframe).setValue(cardNumber);
        await browser.switchToParentFrame();

        // Switch to Stripe iframe for Expiration Date input
        const expDateIframe = await $(this.elements.expDateIframe);
        await browser.switchToFrame(expDateIframe);
        await (await $(this.elements.expDateIframe)).setValue(expDate);
        await browser.switchToParentFrame();

        // Switch to Stripe iframe for CVV input
        const cvvIframe = await $(this.elements.cvvIframe);
        await browser.switchToFrame(cvvIframe);
        await (await $(this.elements.cvvIframe)).setValue(cvv);
        await browser.switchToParentFrame();

        // Name on card
        const nameOnCrd = await $(this.elements.nameOnCardIframe);
        await browser.switchToFrame(nameOnCrd);
        await (await $(this.elements.nameOnCardIframe)).setValue(nameoncard);
        await browser.switchToParentFrame();

        await (await $(this.elements.phoneRemember)).setValue(phonefull);
    }

    async submitOrder() {
        await (await $(this.elements.submitOrderButton)).click();
    }

    async waitForErrorMessage() {
        await $$(this.elements.cvvErrorMessage)[0].waitForDisplayed({ 
            timeout: 10000,
            timeoutMsg: 'Error message did not appear after 10s'
        });
    }

    async getPaymentErrorMessage() {
        return await (await $$(this.elements.cvvErrorMessage)[0]).getText();
    }
}

export default new CheckoutPage();

