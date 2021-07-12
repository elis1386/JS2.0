
const product = (name, size, color, price, image) => ({ name, size, color, price, image })



const products = [
    product('T-shirt', 'M', 'white', '250 $', 'images/item-1.png'),
    product('Blaser', 'S', 'Red', '125 $', 'images/item-2.png'),
    product('Jacket', 'L', 'Darkblue', '550 $', 'images/item-3.png'),
    product('Dress', 'XL', 'Flowers', '450 $', 'images/item-4.png'),

]



new Vue({
    el: '#app',
    data: {
        products: products,
        product: products[0],
        selectedProductIndex: 0,
        phoneVisibl: false,
    },
    methods: {
        selectProduct: function (index) {
            this.product = products[index]
            this.selectedProductIndex = index
        }
    }
})