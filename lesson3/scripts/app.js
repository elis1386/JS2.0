'use strict';

const API = 'https://raw.githubusercontent.com/ArefievVyacheslav/AdvancedJS2/main/products.json';

//БАЗОВЫЕ классы
class Item {
    // класс отдельной вещи
    // на вход в конструктор:
    // product - объект из JSON
    // essence - название класса, который вызывает
    // count - счётчик продуктов
    // ЦЕЛЬ КЛАССА - обработать полученные данные о товаре и отдать готовый HTML-шаблон
    constructor(product, essence) {
        this.essence = essence;
        this.product_id = product.id;
        this.product_image = product.image;
        this.product_title = product.title;
        this.product_description = product.description;
        this.product_quantity = product.quantity;
        this.product_price = product.price;
    }
    // получаю готовый HTML-шаблон ОТДЕЛЬНОГО продукта Каталога/Корзины в зависимости от конструктора, который вызвал
    generateHTML() {
        if (this.essence === 'Catalog') {
            return `<div class="item">
<a href="single-page.html" class="product_cart">
<img src=${this.product_image} class="icon" alt="product icon">
<span class="product_desc">${this.product_title}</span>
<span class="product_desc">${this.product_description}</span>
<span class="product_price">\$${this.product_price}</span>
</a>
<div class="add-box">
<a class="add-to-cart">
<img src="img/icon_cart.svg" alt="add to cart">
<span>Add to Cart</span>
</a>
</div>
</div>`
        }
        if (this.essence === 'Cart') {
            return `<a href="single-page.html" class="basket-hover-menu"></a>
<figure class="my-account-item">
<img src=${this.product_image} alt="photo" class="img-cart">
<div class="my-acc-right">
<div class="my-acc-info">
<h3 class="my-acc-head">Rebox Zane</h3>
<div class="review_stars stars-height" >
<input id="star-5" type="radio" name="stars"/>
<label title="Отлично" for="star-5">
<i class="fas fa-star"></i>
</label>
<input id="star-4" type="radio" name="stars"/>
<label title="Хорошо" for="star-4">
<i class="fas fa-star"></i>
</label>
<input id="star-3" type="radio" name="stars" />
<label title="Нормально" for="star-3">
<i class="fas fa-star"></i>
</label>
<input id="star-2" type="radio" name="stars"/>
<label title="Плохо" for="star-2">
<i class="fas fa-star"></i>
</label>
<input id="star-1" type="radio" name="stars"/>
<label title="Ужасно" for="star-1">
<i class="fas fa-star"></i>
</label>
</div>
<div class="my-acc-text">${this.product_quantity}
<span class="text-x">x</span> \$${this.product_price * this.product_quantity}</div>
</div>
<a class="fas fa-times-circle"></a>
</div>
</figure>
<hr class="my-acc-hr">`
        }
    }
}

class ItemsList {
    // класс отдельного списка вещей
    // ЦЕЛЬ КЛАССА:
    constructor() {
        // catalogProducts - хранит массив всех товаров в каталоге
        this.catalogProducts = [];
        // cartProducts - хранит массив всех товаров, которые добавлены в корзину
        this.cartProducts = {};
        // cartProductsId - хранит массив всех ID товаров, которые добавлены в корзину
        this.cartProductsId = [];
        // htmlList - хранит объект всех ID:html-разметок товаров, которые добавлены в корзину
        this.htmlList = {};
        // buttons - хранит массив всех кнопок "Add to cart", нужен для идентификации/добавления/удаления товаров
        this.buttons = [];
        // essence - название класса, который вызывает, для идетификации
        this.essence = this.constructor.name;
        // container - блок, куда вставлять товары
        this.container = '';
        this.callIdentifier();
        this.getProducts();
    }
    // определение блока для вставки товаров в HTML на основе вызывающего класса
    callIdentifier() {
        if (this.essence === 'Catalog') this.container = '.products_block';
        if (this.essence === 'Cart') this.container = '.my-account-menu';
    }
    //получаю готовый HTML-шаблон ЦЕЛОГО(ой) Каталога/Корзины в зависимости от конструктора, который вызвал
    getProducts() {
        let response = fetch(API)
            .then(data => {
                return data.json()
            });
        response.then(resp => this.catalogProducts = resp);
    }
    generateHTML() {
        if (this.essence === 'Catalog') {
            setTimeout(() => {
                let productsHTML = '';
                this.catalogProducts.forEach(product => {
                    let good = new Item(product, this.constructor.name);
                    productsHTML += good.generateHTML();
                });
                document.querySelector(this.container).innerHTML = productsHTML;
            }, 1500);
        }
        // if (this.essence === 'Cart') {
        // let productsHTML = '';
        // this.cartProducts.forEach(product => {
        // let good = new Item(product, this.constructor.name);
        // productsHTML = good.generateHTML(count);
        // });
        // document.querySelector(this.container).insertAdjacentHTML('afterbegin', productsHTML);
        // }
        if (this.essence === 'Cart') {
            let arrProd = Object.values(this.cartProducts);
            arrProd.forEach(product => {
                // создаю HTML-разметку товара
                let good = new Item(product, this.constructor.name);
                // добавляю в объект HTML-разметок товаров корзины ID:HTML-код
                this.htmlList[`${product.id}`] = good.generateHTML();
            });
            // отчищаю корзину от предыдущего клика
            document.querySelector(this.container).innerHTML = '';
            // для каждого элемента в корзине создаю готовую HTML-разметку корзины
            for (let id in this.htmlList) {
                document.querySelector(this.container).insertAdjacentHTML('afterbegin', this.htmlList[id]);
            }
            let footerCart = `<div class="cost">
</div>
<a href="checkout.html" class="my-acc-button">Checkout</a>
<a href="shopping-cart.html" class="my-acc-button">Go to cart</a>`
            document.querySelector(this.container).insertAdjacentHTML('beforeend', footerCart);
        }
    }
    //получаю список кнопок для индертификации с продуктами, записываю data-атрибуты с id товара
    getIdButtons() {
        setTimeout(() => {
            let count = 0;
            this.buttons = document.querySelectorAll('.add-to-cart');
            this.buttons.forEach(button => {
                button.setAttribute('data-id', `${count}`)
                count++;
            });
        }, 2000);
    }
}

//НАСЛЕДОВАННЫЕ КЛАССЫ
class Catalog extends ItemsList {
    constructor() {
        super();
        /** 2. Запускаю генерацию целого каталога */
        this.generateHTML();
    }
}

class Cart extends ItemsList {
    constructor() {
        super();
        //получаю список кнопок для индертификации с продуктами
        this.getIdButtons();
        this.addProduct();
    }
    // добавление продукта в корзину
    addProduct() {
        setTimeout(() => {
            // для каждой кнопки
            this.buttons.forEach(button => {
                // по клику
                button.addEventListener('click', () => {
                    let id = button.getAttribute('data-id');
                    // добавляем объект товара в список товаров корзины
                    this.cartProducts[id] = this.catalogProducts[id]
                    // добавляю ID товара в список ID товаров корзины
                    this.cartProductsId.push(this.catalogProducts[id].id);

                    let arrProd = Object.values(this.cartProducts);

                    arrProd.forEach(product => {
                        if (product === this.catalogProducts[id]) {
                            this.cartProducts[product.id].quantity += 1;
                        }
                    });
                    // if (this.catalogProducts[id] in arrProd) {
                    // console.log('true');
                    // }



                    this.generateHTML();
                });
            });
        }, 2500);
    }
    // ДОПИСАТЬ!!!
    // removeProduct() {
    // }
    // sum() {
    //
    // }
}

/** 1. Создаю экземпляр каталога */
const catalog = new Catalog();

/** 3. Создаю экземпляр корзины */
const cart = new Cart();


// Сделано: товары при добавлении в корзину не дублируются

