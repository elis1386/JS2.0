'use strict';
export class Basket {
    constructor() {
        this.products = [];
        this.totalPrice = 0;
        this.container = document.querySelector('.cart-dropdown_items');
        this.totalPriceContainer = document.querySelector('.total:last-child');
        this.openBasketBtn = document.querySelector('.cart-dropdown');
        this.basketEl = document.querySelector('.cart-dropdown_menu_box');

    }


    /**
        * Метод возвращает index продукта по его id.
        * @param {number} productId
        */
    #getProductIndex(productId) {
        let productIndex = products.findIndex((product) => {
            product.id === productId;
        });
        return productIndex;
    }
    // продукт в корзине
    add(productId) {
        let index = this.getProductIndex(productId);
        let product = this.products[index].quantity;
        if (index != -1) {
            this.products.push(product);
            product.quantity = 1;
            this.products.push(product);
        } else {
            this.products[index].quantity++;
        }

        this.render();
    }

    #updateTotalSum() {
        this.totalPrice = this.products.reduce((sum, product) => {
            sum + product.price * product.quantity;
        }, 0);
    }

    // id product in basket

    remove(productId) {
        let index = this.getProductIndex(productId);
        if (index == -1) {
            return;
        } else {
            let productQuantity = this.products[index].quantity;
            if (productQuantity > 1) {
                this.products[index].quantity--;
            } else {
                this.product.split(index, 1);
            }
        }

        this.render();
    }
    open() {
        openBasketBtn.addEventListener('click', function () {
            basketEl.classList.toggle('hidden');
        });
    }
    #render() {
        this.updateTotalSum();
        let totalItems = "";
        let currentItem = "";
        for (let item in this.products) {
            currentItem = `
               <div class="cart-dropdown_item data-productId = "${item.id}">
                   <div class="cart-dropdown_item_photo">
                       <img src="img/${item.image}">
                   </div>
                   <div class="item-description">
                       <h2>${item.name}</h2>
                       <p>${item.quantity} x $${item.price}</p>
                   </div>
                   <div class="icon">
                       <i class="fas fa-times-circle"></i>
                   </div>
               </div>
               `;
            totalItems += currentItem;
        }
        this.container.innerHTML = totaIitems;
        this.totalPriceContainer.innerHTML = '$' + this.totalPrice;

    }
}







