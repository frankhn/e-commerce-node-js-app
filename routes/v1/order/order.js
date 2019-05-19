import express from 'express';
import Product from '../../../controllers/product';

const router = express.Router();

// create car instance
const product = new Product();

// create order
router.post('/', product.create);

// get info about order
router.get('/:id', product.fetch);


// get orders by customer
router.get('/inCustomer', product.fetch);

// get shortDetails
router.get('/shortDetails/:id', product.fetch);

export default router;
