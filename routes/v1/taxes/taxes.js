import express from 'express';
import Product from '../../../controllers/product';

const router = express.Router();

// create car instance
const product = new Product();

// get all taxes
router.get('/', product.create);

// get tax tax by id
router.get('/:taxId', product.fetch);


export default router;
