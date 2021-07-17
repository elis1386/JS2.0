'use strict';

export class Product {
    /**
     * 
     * @param {array} products
     * @param {function} addToCartCallback
     */
    constructor(products, addToCartCallback) {
        this.products = products;
        this.callback = addToCartCallback;
    }

    #getProductMarkup(product) {
        const pathToImages = 'img';
        return `
        <div class="item">
            <a class="product"
                href="single page.html">
                <img alt="product photo"
                        class="product-img"
                        src="${pathToImages}/${product.image}">
                <div class="product-text-box">
                    <p class="product-text">${product.name}</p>
                    <p class="product-price">${product.price}</p>
                </div>
            </a>
            <div class="box-add">
                <a class="add" data-productId = "${product.id}" href="#"><img class="add-img" src="${pathToImages}/cart_add.svg" alt="cart-img">Add to
                    cart</a>
            </div>
        </div>
    `;
    }

    renderProducts(products) {
        let productsMarkup = '';
        for (let product of products) {
            productsMarkup += getProductMarkup(product);
        }
        const boxProducts = document.querySelector('.box-product');
        boxProducts.innerHTML = productsMarkup;
        this.addEventListenerForAddToCart();
    }
    #addEventListenerForAddToCart() {
        const addToCartBtns = document.querySelectorAll('a[data-productId]');
        addToCartBtns.forEach(function (a) {
            a.addEventListener('click', addedProductHandler);
        });
    }
    #addedProductHandler(event) {
        const productId = event.currentTarget.getAttribute('data-productId');
        this.callback(productId);
    }
}