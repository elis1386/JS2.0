'use strict';
class Basket {
    /**
     * @param {string} icon путь до иконки
     * @param {number} totalPrice цена всех товаров
     */
    constructor(icon) {
        this.products = [];
        this.icon = icon;
        this.totalPrice = 0;
    }

    /**
    * Метод возвразает index продукта по его id.
    * @param {number} productId
    */
    getProductIndex(productId) {
        let productIndex = products.findIndex((product) => {
            product.id === productId;
        });
        return productIndex;
    }
    /**
    * Метод возвразает продукт по его.
    * @param {number} productId
    */
    getProduct(productId) {
        let product = products.find((product) => {
            product.id === productId;
        });
        return product;
    }

    // продукт в корзине
    add(productId) {
        let index = this.getProductIndex(productId);
        let product = this.getProduct(productId)
        if (index != -1) {
            this.products.push(product);
            product.quantity = 1;
        } else {
            this.products[index].quantity++;
        }

        this.updategetTotalSum()
    }

    updategetTotalSum() {
        this.totalPrice = this.products.reduce((sum, product) => {
            sum + product.price * product.quantity;
        }, 0);
    }
    remove()
}

const openBasketBtn = document.querySelector('cart-dropdown');
const basketEl = document.querySelector('.cart-dropdown_menu_box');
openBasketBtn.addEventListener('click', function () {
    basketEl.classList.toggle('hidden');
})
let basket = {};


/**
 * Функция срабатывает когда нужно отрисовать продукт в корзине.
 * @param {number} productId
 */
function renderProductInBasket(productId) {
    let productExist = document.querySelector(`.productCount[data-productId="${productId}"]`);
    if (productExist) {
        increaseProductCount(productId);
        recalculateSumForProduct(productId);
    } else {
        renderNewProductInBasket(productId);
    }
}


/**
 * Функция отрисовывает новый товар в корзине.
 * @param {number} productId
 */
function renderNewProductInBasket(productId) {
    let productRow = `
    <div class="cart-dropdown_item">
        <div class="cart-dropdown_item_photo">
            <img src="img/cart-dropdown-photo1.png">
        </div>
        <div class="item-description">
            <h2>Rebox Zane</h2>
            <p>1 x $250</p>
        </div>
        <div class="icon">
            <i class="fas fa-times-circle"></i>
        </div>
    </div>
    `
}

/**
 * Метод увеличивает количество товаров в строке в корзине.
 * @param {number} productId
 */
function increaseProductCount(productId) {
    const productCountEl = document.querySelector(`.productCount[data-productId="${productId}"]`);
    productCountEl.textContent++;
}


/**
 * Метод пересчитывает стоимость товара умноженное на количество товара
 * в корзине.
 * @param {number} productId
 */
function recalculateSumForProduct(productId) {
    basketCounterEl.textContent++;
}

/**
 * Метод пересчитывает общую стоимость корзины и выводит это значение на страницу.
 */
function calculateAndRenderTotalBasketSum() {
    let totalSum = 0;
    for (let productId in basket) {
        totalSum += basket[productId] * products[productId].price;
    }
    basketTotalValueEl.textContent = totalSum.toFixed(2);
}
/**
 * Метод удаляет товар из корзины и пересчитывает общую сумму.
 */
function deleteAndRenderTotalBasketSum() {

}

/**
 * эта функц срабатывает когда добавляется новый товар в корзину.
 * @param {number} productId
 */
