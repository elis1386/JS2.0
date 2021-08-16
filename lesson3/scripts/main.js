'use strict';

// Доступ к данным
const API = 'https://raw.githubusercontent.com/ArefievVyacheslav/AdvancedJS2/main/products.json';
function getProduts(url) {
    return fetch(url).then(response => response.json());
}

// (M) Модель данных


// (V) Представление данных
function render(products, productRender, divId) {
    let productsHTML = '';
    products.forEach(product => {
        productsHTML += productRender(product);
    });
    document.getElementById(divId).innerHTML = productsHTML;
}

function getProductMarkup(product) {
    return `
            <div class="item">
                <a class="product"
                    href="single page.html">
                    <img alt="product photo"
                         class="product-img"
                         src="${product.image}">
                    <div class="product-text-box">
                        <p class="product-text">${product.title}</p>
                        <p class="product-price">${product.price}</p>
                    </div>
                </a>
                <div class="box-add">
                    <a class="add" dataproductId = "${product.id}" href="#">
                        <img class="add-img" src="img/cart_add.svg" alt="cart-img">Add to cart
                    </a>
                </div>
            </div>
        `;
}

function getCartProductMarkup(product) {
    return `
            <div class="cart-dropdown_item data-productId = "${product.id}">
                <div class="cart-dropdown_item_photo">
                    <img src="${product.image}" width="50px">
                </div>
                <div class="item-description">
                    <h2>${product.title}</h2>
                    <p>${product.quantity} x $${product.price}</p>
                </div>
                <div class="icon">
                    <i class="fas fa-times-circle"></i>
                </div>
            </div>
        `;
}

// (C) Контроллер
getProduts(API).then(products => render(products, getProductMarkup, 'products-catalog'));

getProduts(API).then(products => render(products, getCartProductMarkup, 'product-cart'));

// повесить обработчики событий на кнопку добавления товаров в корзину и на кнопку удаления товаров из корзины
// внутри обработчиков выводить в консоль 'product id'
