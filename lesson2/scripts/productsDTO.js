'use strict';

class ProductDTO {
    /**
     * 
     * @param {number} id  уникальный идентификатор
     * @param {string} image название файла с картинкой
     * @param {string} name имя товара
     * @param {number} price цена товара
     */
    constructor(id, image, name, price) {
        this.id = id;
        this.image = image;
        this.name = name;
        this.price = price;
    }
}