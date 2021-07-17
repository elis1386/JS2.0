'use strict';
class Basket {
    /**
     * 
     * @param {number} id  уникальный идентификатор
     * @param {string} image название файла с картинкой
     * @param {string} name имя товара
     * @param {number} price цена товара
     * @param {string} icon путь до иконки
     * @param {number} totalPrice цена всех товаров
     */
    constructor(id, image, name, price) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
        this.icon = icon;
        this.totalPrice = totalPrice;
    }
}





/**
 * Метод добавляет продукт в объект basket.
 * @param {number} productId
 */
function addProductToObject(productId) {
    if (!(productId in basket)) {
        basket[productId] = 1;
    } else {
        basket[productId]++;
    }
}
/**
 * Метод увеличивает количество товаров в строке в корзине.
 * @param {number} productId
 */
function increaseProductCount(productId) {
}

/**
 * Метод пересчитывает стоимость товара умноженное на количество товара
 * в корзине.
 * @param {number} productId
 */
function recalculateSumForProduct(productId) {
}

/**
 * Метод пересчитывает общую стоимость корзины и выводит это значение на страницу.
 */
function calculateAndRenderTotalBasketSum() {

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
function addProductIntoBasket(productId) {
    addProductToObject(productId);
    renderProductInBasket(productId);
    calculateAndRenderTotalBasketSum();
}