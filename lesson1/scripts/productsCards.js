'use strict';


function getProductMarkup(product) {
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
                <a class="add" href="#"><img class="add-img" src="${pathToImages}/cart_add.svg" alt="cart-img">Add to
                    cart</a>
            </div>
        </div>
    `;
}

function addProducts(products) {
    let productsMarkup = '';
    for (let product of products) {
        productsMarkup += getProductMarkup(product);
    }
    const boxProducts = document.querySelector('.box-product');
    boxProducts.innerHTML = productsMarkup;
}
addProducts(products);