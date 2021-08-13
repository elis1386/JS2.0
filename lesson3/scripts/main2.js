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
class Product {
    constructor(id, image, title, price, quantity) {
        this.id = id;
        this.image = image;
        this.title = title;
        this.price = price;
        this.quantity = quantity;
    }
}

// (V) Представление данных
class ProductsView {
    constructor(id) {
        this.id = id;
    }
    render(products) {
        let productsHTML = '';
        products.forEach(product => {
            productsHTML += this.getProductMarkup(product);
        });
        document.getElementById(this.id).innerHTML = productsHTML;
    }
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
                        <p class="product-price">\$${product.price}</p>
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


// (C) Контроллер
const service = new Service(API);
const productsView = new ProductsView('products-catalog');
service.getProduts().then(products => {
    let productList = [];
    products.forEach(product => {
        productList.push(new Product(product.id, product.image, product.title, product.price, product.quantity));
    });
    return productsView.render(productList);
});