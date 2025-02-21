import { browser, $, $$ } from '@wdio/globals';
import HomePage from '../pageobjects/HomePage.js';

describe('Telnyx Homepage Load Test', () => {
    beforeEach(async () => {
        await HomePage.visit();
    });

    it('should load the homepage successfully', async () => {
        await expect(browser).toHaveTitle('Telnyx - Global solutions for Communications, IOT, AI, Compute and Networking');

        await expect(HomePage.getHeader()).toBeDisplayed();
        await expect(HomePage.getFooter()).toBeDisplayed();
        await expect(HomePage.getMainContent()).toBeDisplayed();
    });

    it('should load within acceptable time (3 seconds)', async () => {
        await HomePage.measurePageLoadTime();
    });
});