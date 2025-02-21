import { expect, browser, $, $$ } from '@wdio/globals';

class HomePage {
  
    elements = {
        siteHeader: 'header.c-fuRoiU',
        siteMain: 'main',
        siteFooter: 'footer',
        hamburgerIcon: 'button[aria-controls="main-menu-content"] svg[aria-hidden="true"]',
        errorAlert: '.MuiAlert-message',
        loginUrl: '/#/login/sign-in',
        signUpLink: '#main-menu a[href="/sign-up"]',
        logLink: 'a=Log in',
        shopLink: '//a[text()="Shop"]'
    };


async visit() {
    await browser.url('https://telnyx.com');
}

getHeader() {
    return $(this.elements.siteHeader);
}

getFooter() {
    return $(this.elements.siteFooter);
}

getMainContent() {
    return $(this.elements.siteMain);
}

async getTitle() {
    return await browser.getTitle();
}

async getHamburgerIcon() {
    return await $(this.elements.hamburgerIcon);
}

async verifyLoginPageUrl() {
    const currentUrl = await browser.getUrl();
    await expect(currentUrl).toContain('/#/login/sign-in');
}

async clickOnLogin() {
    const loginLink = await $$(this.elements.logLink);
    await browser.execute((element) => {
        element.removeAttribute('target');
    }, loginLink[0]);
    
    await loginLink[0].click();
    await this.verifyLoginPageUrl();
}

async clickOnShop() {
    const shopLinks = await $$(this.elements.shopLink);
    await browser.execute((element) => {
        element.removeAttribute('target');
    }, shopLinks[0]);
    
    await shopLinks[0].click();
}

async navigateToSignUp() {
    const signUpLink = await $(this.elements.signUpLink);
    await signUpLink.click();
}

async measurePageLoadTime() {
    const navigationEntry = await browser.execute(() => {
        const [entry] = performance.getEntriesByType('navigation');
        return entry ? entry.toJSON() : null;  
    });

    if (navigationEntry) {
        const loadTime = navigationEntry.loadEventEnd - navigationEntry.startTime; 
        console.log(`Page load time: ${loadTime}ms`);
        expect(loadTime).toBeLessThan(3000);
    } else {
        throw new Error('Navigation timing data not available.');
    }
}


}

export default new HomePage();