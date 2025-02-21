import { browser, $, $$ } from '@wdio/globals';

class NavigationPage {
    elements = {
        navigationMenu: '.c-ihSZrZ', 
        expandedMenu: '.c-UazGY', 
        navLinks: '.c-ihSZrZ a',
        expandedNavLinks: '.c-UazGY nav a',
        menuToggleButton: '#main-menu-content button:first-child'
    };


async verifyNavigationMenuVisibility() {
    await expect($(this.elements.navigationMenu)).toBeDisplayed();
    await expect($(this.elements.expandedMenu)).toBeDisplayed();
}

async verifyNavLinks() {
    const links = await $$(this.elements.navLinks);
    for (const link of links) {
        await expect(link).toBeDisplayed();
        const href = await link.getAttribute('href');
        
        expect(href).not.toBeNull();
        expect(href.trim()).not.toBe('');
    }
}
// async verifyNavLinks() {
//     const links = await $$(this.elements.navLinks);
//     for (const link of links) {
//         await expect(link).toBeDisplayed();
//         await expect(link).toHaveAttribute('href', '');
//     }
// }

async toggleExpandedMenu() {
    const toggleButton = await $(this.elements.menuToggleButton);
    await toggleButton.click();
}

async verifyExpandedNavLinks() {
    const links = await $$(this.elements.expandedNavLinks);
    for (const link of links) {
        const href = await link.getAttribute('href');
        expect(href).not.toBeNull();
        expect(href.trim()).not.toBe('');
    }
}

async navigateToPage(link) {
    await browser.url(link);
}
}

export default new NavigationPage();
