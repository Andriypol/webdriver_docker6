import { browser, $, $$ } from '@wdio/globals';

class ProductPage {
    elements = {
        productTitle: 'h1', 
        productPrice: '.price--large', 
        productDescription: '.product__description', 
        quantityInput: 'input.quantity__input:nth-child(2)', 
        addToCartButton: '.product-form__submit',
        cartQuantity: '#Drawer-quantity-1', 
        cartProductName: '.cart-item__name', 
        cartItemCount: '[data-testid="CartCount"]',
        iconCartNumber: '.cart-count-bubble span[aria-hidden="true"]',
        closeIcon: '.drawer__close',
        checkoutBtn: '#CartDrawer-Checkout'
    };

    async getProductTitle() {
        return await $(this.elements.productTitle).getText();
    }

    async getProductPrice() {
        return await $(this.elements.productPrice).getText();
    }

    async getProductDescription() {
        return await $(this.elements.productDescription).getText();
    }

    async setQuantity(quantity) {
        await $(this.elements.quantityInput).setValue(quantity);
    }

    async addToCart() {
        await $(this.elements.addToCartButton).click();
    }

    async getInnerCartItemCount() {
        return await $(this.elements.cartQuantity).getValue();
    }

    async getIconCartNumber() {
        return await $(this.elements.iconCartNumber).getText();
    }

    async closeCart() {
        await $(this.elements.closeIcon).click();
    }

    async getProductCartName() {
        return await $(this.elements.cartProductName).getText();
    }

    async goToCart() {
        await $(this.elements.cartIcon).click();
    }

    async clickCheckout() {
        await $(this.elements.checkoutBtn).click();
    }

}

export default new ProductPage();