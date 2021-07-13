'use strict';
import Basket from './basket';
import { productsList } from './products';
import Product from './products';


const basket = new Basket();
const product = new Product(productsList, basket.add);
product.renderProducts();
