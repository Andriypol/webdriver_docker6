import { browser, $, $$ } from '@wdio/globals';

class ShopPage {
    elements = {
        cartIcon: 'a[href="/cart"]',
        shopProducts: 'slider-component ul li',
        subscribeEmailInput: 'input[type="email"]',
        subscribeButton: 'button[type="submit"]',
        //search
        searchIcon: 'summary[aria-label="Search"]',
        searchInput: 'input[type="Search"]', 
        searchButton: 'button[aria-label="Search"]', 
        searchResults: '.product-grid', 
        productTitles: 'h3.card__heading',
        //cart
        cartItems: '.cart-item', 
        productName: '.cart-item-title', 
        productQuantityInput: '.cart-item-quantity input', 
        updateQuantityButton: '.update-cart', 
        removeProductButton: '.cart-remove', 
        emptyCartMessage: '.cart-empty-message', 
        checkoutButton: 'a[href="/checkout"]' 
    };

    async openShop() {
        await browser.url('https://shop.telnyx.com/');
    }

    async clickOnSearch() {
        await $(this.elements.searchIcon).click();
    }

    async goToFirstProduct() {
        const products = await $$(this.elements.shopProducts);
        if (products.length === 0) {
            throw new Error('No products found on the page');
        }
        const firstItem = products[0];
        await firstItem.click();
    }

    async clickCartIcon() {
        await $(this.elements.cartIcon).click();
    }

    async subscribeToNewsletter(email) {
        await $(this.elements.subscribeEmailInput).setValue(email);
        await $(this.elements.subscribeButton).click();
    }

    async getFeaturedProducts() {
        const products = await $$(this.elements.featuredProducts);
        return Promise.all(products.map(async (product) => ({
            name: await product.getText(),
            link: await product.getAttribute('href')
        })));
    }

    async searchProduct(productName) {
        await $(this.elements.searchInput).setValue(productName);
        await $(this.elements.searchButton).click();
    }

    async getSearchResultsText() {
        return await $(this.elements.searchResults).getText();
    }

    async isProductInResults(productName) {
        const products = await $$(this.elements.productTitles);
        for (let product of products) {
            let text = await product.getText();
            if (text.includes(productName)) {
                return true;
            }
        }
        return false;
    }
}

export default new ShopPage();