import express from 'express';
import Product from '../../../controllers/product';

const router = express.Router();

// create car instance
const product = new Product();

// generate a unique cart id
router.get('/generateUniqueId', product.create);

// add product to cart
router.post('/add', product.fetch);

// get list of cart
router.get('/:cartId', product.fetch);

// update cart by item
router.put('/update/:itemID', product.fetch);

// empty the cart
router.delete('/empty/:cartID', product.fetch);

// moveToCart
router.get('moveToCart/:itemID', product.fetch);

// total amount in cart
router.get('totalAmount/:cartId', product.fetch);

// save product for later
router.get('saveForLater/:itemID', product.fetch);

// get saved
router.post('getSaved/:cartID', product.fetch);

// remove from cart
router.post('/removeProduct/:itemID', product.fetch);

export default router;
