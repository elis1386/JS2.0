'use strict';

// Доступ к данным
const API = 'https://raw.githubusercontent.com/ArefievVyacheslav/AdvancedJS2/main/products.json';
class Service {
    constructor(url) {
        this.url = url
    }
    getProduts() {
        return fetch(this.url).then(response => response.json());
    }
}

// (M) Модель данных


// (V) Представление данных
class View {
    constructor(divId) { // указано место куда рендерить html
        this.divId = divId;
    }
    render(products) { //  проходит по массиву и генерирует разметку
        let productsHTML = '';
        products.forEach(product => {
            productsHTML += this.getProductMarkup(product);
        });
        document.getElementById(this.divId).innerHTML = productsHTML;
    }
    getProductMarkup(product) { // показывает ошибку, если  в getProductMarkup не было внесено изменений
        console.error('Переопределите метод');
        return '';
    }
}

class ProductsView extends View { // наследуем от View конструктор и метод.
    getProductMarkup(product) {
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
}

class CartView extends View { // наследуем от View конструктор и метод.
    getProductMarkup(product) {
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
}



// (C) Контроллер совершает все действия
const service = new Service(API); // работает с данными
const productsView = new ProductsView('products-catalog'); // указываем место генерации кода
service.getProduts().then(products => productsView.render(products)); // выводим товары на страницу


// Обработчик события на кнопки
const addButton = document.querySelectorAll('.add');
addButton.forEach((addToCart) => {
    addToCart.addEventListener('click', addProductToCart)
});

function addProductToCart(event) {
    console.log('added')
}

const cartView = new CartView('product-cart'); // указываем место генерации кода для корзины
service.getProduts().then(products => cartView.render(products)); // выводим товары в корзину

// Обработчик события на кнопки
const removeBtn = document.querySelectorAll('i');
removeBtn.forEach((removeFromCart) => {
    removeFromCart.addEventListener('click', removeProduct)
});

function removeProduct(event) {
    console.log('added')
}





// повесить обработчики событий на кнопку добавления товаров в корзину и на кнопку удаления товаров из корзины
// внутри обработчиков выводить в консоль 'product id'

