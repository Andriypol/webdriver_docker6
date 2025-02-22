import HomePage from '../pageobjects/HomePage.js';
import ProductPage from '../pageobjects/ProductPage.js';
import ShopPage from '../pageobjects/ShopPage.js';
import CheckoutPage from '../pageobjects/CheckoutPage.js';
import { expect, browser, $, $$ } from '@wdio/globals';
import { checkoutData } from '../data/checkout.data.js';

describe('Telnyx Shop Functionality', () => {

    beforeEach(async () => {
        await HomePage.visit();
        await HomePage.clickOnShop();
    });

    it('Verify that the product details page displays correct product information', async () => {
        await ShopPage.goToFirstProduct();
        const title = await ProductPage.getProductTitle();
        const price = await ProductPage.getProductPrice();
        const description = await ProductPage.getProductDescription();

        expect(title).toContain('Telnyx Classic Hat');
        expect(price).not.toBe('');
        expect(description).not.toBe('');
    });

    it('Verify that a product can be added to the cart successfully', async () => {
        await ShopPage.goToFirstProduct();
        await ProductPage.setQuantity(3);
        await ProductPage.addToCart();
        
        const cartCount = await ProductPage.getInnerCartItemCount();
        expect(cartCount).toBe('3');
    });

    it('Verify shopping cart displays added products and allows quantity updates', async () => {
        await ShopPage.goToFirstProduct();
        await ProductPage.setQuantity(4);
        await ProductPage.addToCart();

        const cartItemTitle = await ProductPage.getProductCartName();
        const cartItemQuantity = await ProductPage.getInnerCartItemCount();
        expect(cartItemTitle).toContain('Telnyx Classic Hat');
        expect(cartItemQuantity).toBe('4');

        await ProductPage.setInnerQuantity(2);
        const updatedQuantity = await ProductPage.getInnerCartItemCount();
        expect(updatedQuantity).toBe('2');
    });

    it('Verify shopping cart icon is updated while adding some quantity of products', async () => {
        await ShopPage.goToFirstProduct();
        await ProductPage.setQuantity(3);
        await ProductPage.addToCart();

        const cartItemQuantity = await ProductPage.getInnerCartItemCount();
        await ProductPage.closeCart();
        const cartIconQuantity = await ProductPage.getIconCartNumber();
        expect(Number(cartItemQuantity)).toBe(Number(cartIconQuantity));
    });
    
});

describe('Search Functionality', () => {
    
    beforeEach(async () => {
        await ShopPage.openShop();
        await ShopPage.clickOnSearch();
    });

    it('should return relevant search results for a valid query', async () => {
        const searchQuery = 'Hat';
        await ShopPage.searchProduct(searchQuery);

        await expect($(ShopPage.elements.searchResults)).toBeDisplayed();
        const isRelevant = await ShopPage.isProductInResults(searchQuery);
        expect(isRelevant).toBe(true);
    });

    it('should display no results message for an invalid query', async () => {
        const invalidQuery = 'NonExistingProduct';
        await ShopPage.searchProduct(invalidQuery);

        await expect($(ShopPage.elements.searchResults)).not.toBeDisplayed();
    });

    it('should return relevant search results for a valid partial query', async () => {
        const searchQuery = 'Telnyx';
        await ShopPage.searchProduct(searchQuery);

        await expect($(ShopPage.elements.searchResults)).toBeDisplayed();
        const isRelevant = await ShopPage.isProductInResults(searchQuery);
        expect(isRelevant).toBe(true);
    });
});

describe('Checkout Functionality', () => {

    beforeEach(async () => {
        await ShopPage.openShop();
        await ShopPage.goToFirstProduct();
        await ProductPage.setQuantity(3);
        await ProductPage.addToCart();
        await ProductPage.clickCheckout();
    });

    it('should show error message for invalid card payment', async () => {
        await CheckoutPage.fillCheckoutForm(checkoutData.invalidCardDetails);
        await CheckoutPage.submitOrder();
        await CheckoutPage.waitForErrorMessage();
        // Assert the error message
       await expect(await $(CheckoutPage.elements.cvvErrorMessage)).toBeDisplayed();
       const errorMessage = await CheckoutPage.getPaymentErrorMessage();
       await expect(errorMessage).toContain("Enter the CVV or security code on your card");
    });

    it('should complete checkout using valid card details', async () => {
        await CheckoutPage.fillCheckoutForm(checkoutData.validCardDetails);
        await CheckoutPage.submitOrder();
        await CheckoutPage.waitForErrorMessage();

        // Assert the error message
       await expect(await $(CheckoutPage.elements.cvvErrorMessage)).toBeDisplayed();
       const errorMessage = await CheckoutPage.getPaymentErrorMessage();
       await expect(errorMessage).toContain("Enter the CVV or security code on your card");
    });
});