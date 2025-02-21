import navLinks from '../data/menu-links.json';
import NavigationPage from '../pageobjects/NavigationPage.js';
import HomePage from '../pageobjects/HomePage.js';
import { expect, browser, $, $$ } from '@wdio/globals';

describe('Telnyx Navigation Menu Functionality Test', () => {
    beforeEach(async () => {
        await HomePage.visit();
    });

    it('should display the navigation menu and all its links', async () => {
        await NavigationPage.verifyNavigationMenuVisibility();
        await NavigationPage.verifyNavLinks();

        await NavigationPage.toggleExpandedMenu();
        await NavigationPage.verifyExpandedNavLinks();
    });

    it('should navigate to the correct pages when links are clicked', async () => {
        for (const link of navLinks) {
            await NavigationPage.toggleExpandedMenu();
            await NavigationPage.navigateToPage(link.partialUrl);
            
            // Correct way to get the current URL
            const currentUrl = await browser.getUrl();
            console.log("Current URL:", currentUrl);
            console.log("Expected to contain:", link.partialUrl);
            
            // Correct expectation check
            //await expect(browser).toHaveUrl(link.partialUrl);
            await expect(currentUrl).toContain(link.partialUrl);
            
            // Return to the homepage
            await HomePage.visit();
        }
    });
});