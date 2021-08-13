'use strict';

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

/**
 * Базовые классы
 */
class List {
    constructor(url, container, list = listContext) {
        this.container = container;
        this.list = list; // словарь для классов строка 213
        this.url = url;
        this.goods = [];
        this.allProducts = [];
        this.filtered = []; // отфильтрованные товары
        this._init();
    }

    /**
   * получение данных с сервера
   * @param url
   * @returns {Promise<any | never>}
   */
    getJson(url) {
        return fetch(url ? url : `${API + this.url}`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            })
    }

    /**
     * обработка полученных данных
     * @param data
     */
    handleData(data) {
        this.goods = data;
        this.render();
    }

    /**
   * подсчет стоимости всех товаров
   * @returns {*|number}
   */
    calcSum() {
        return this.allProducts.reduce((accum, item) => accum += item.price, 0);
    }
    render() {
        const block = document.querySelector(this.container);
        for (let product of this.goods) {
            console.log(this.constructor.name);
            const productObj = new this.list[this.constructor.name](product);

            // альтернативаня реализация без словаря
            // let productObj = null;
            // if (this.constructor.name === 'ProductsList') productObj = new ProductItem(product);
            // if (this.constructor.name === 'Cart') productObj = new CartItem(product);
            // if (!productObj) return;

            console.log(productObj);
            this.allProducts.push(productObj);
            block.insertAdjacentHTML('beforeend', productObj.render());
        }
    }
    _init() {
        return false
    }
}


class Item {
    constructor(el, img = 'https://via.placeholder.com/200x150') {
        this.product_name = el.product_name;
        this.price = el.price;
        this.id_product = el.id_product;
        this.img = img;
    }
    render() {
        return ``;
    }
}

/**
 * Наследуемся от базовых классов
 */
class ProductsList extends List {
    constructor(cart, container = '.box-product', url = "/catalogData.json") {
        super(url, container);
        this.cart = cart;
        this.getJson()
            .then(data => this.handleData(data));
    }

    _init() {
        document.querySelector(this.container).addEventListener('click', e => {
            if (e.target.classList.contains('buy-btn')) {
                this.cart.addProduct(e.target);
            }
        });
        // document.querySelector('.search-form').addEventListener('submit', e => {
        //     e.preventDefault();
        //     this.filter(document.querySelector('.search-field').value)
        // })
    }
}

class ProductItem extends Item {
    render() {
        return `<div class="product-item" data-id="${this.id_product}">
                  <img src="${this.img}" alt="Some img">
                  <div class="desc">
                      <h3>${this.product_name}</h3>
                      <p>${this.price} ₽</p>
                      <button class="buy-btn"
                      data-id="${this.id_product}"
                      data-name="${this.product_name}"
                      data-price="${this.price}">Купить</button>
                  </div>
              </div>`;
    }
}

class Cart extends List {
    constructor(container = ".cart-products", url = "/getBasket.json") {
        super(url, container);
        this.getJson()
            .then(data => {
                this.handleData(data.contents);
            });
    }

    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
                    <div class="product-bio">
                    <img src="${this.img}" alt="Some image">
                    <div class="product-desc">
                    <p class="product-title">${this.product_name}</p>
                    <p class="product-quantity">Количество: ${this.quantity}</p>
                <p class="product-single-price">${this.price} за ед.</p>
                </div>
                </div>
                <div class="right-block">
                    <p class="product-price">${this.quantity * this.price} ₽</p>
                    <button class="del-btn" data-id="${this.id_product}">&times;</button>
                </div>
                </div>`
    }
}
const listContext = {
    ProductsList: ProductItem,
    Cart: CartItem
};

let cart = new Cart();
let products = new ProductsList(cart);
