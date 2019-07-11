import express from 'express';
import TokenValidator from '../../../middlewares/TokenValidator';
import Cart from '../../../controllers/cart';
import * as Validation from '../../validations/cart/addToCart.validation'
import { celebrate } from 'celebrate';

const router = express.Router();

// create car instance
const cart = new Cart();

// generate a unique cart id
router.get('/generateUniqueId', cart.generateUniqueCartId);

// add product to cart
router.post('/add', celebrate({ body: Validation.addToCart }), cart.addToCart);

// get list of products in a cart
router.get('/:cartId(\\d+)', cart.listOfProductsInCart);

// update cart by item
router.put('/update/:cartId(\\d+)', celebrate({ body: Validation.updateCart }), cart.updateCartByItem);

// empty the cart
router.delete('/empty/:cartId(\\d+)', cart.emptyCart);

// moveToCart
// router.get('moveToCart/:itemID(\\d+)', (req, res, next) => {
//   new TokenValidator(req, res, next).verify();
// }, cart.MoveAProductToCart);

// total amount in cart
router.get('/totalAmount/:cartId(\\d+)', cart.TotalAmountFromCart);

// save product for later
router.get('saveForLater/:itemID(\\d+)', (req, res, next) => {
  new TokenValidator(req, res, next).verify();
}, cart.saveProductForLater);

// get saved
router.post('getSaved/:cartID(\\d+)', (req, res, next) => {
  new TokenValidator(req, res, next).verify();
}, cart.productsSavedFoLater);

// remove from cart
router.post('/removeProduct/:itemID(\\d+)', (req, res, next) => {
  new TokenValidator(req, res, next).verify();
}, cart.removeProductInCart);

export default router;
