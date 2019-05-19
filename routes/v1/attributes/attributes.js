import express from 'express';
import Product from '../../../controllers/product';

const router = express.Router();

// create car instance
const product = new Product();

// get all attributes
router.get('/', product.create);

// get one attribute by ID
router.get('/:attributeID', product.fetch);

// get values of attribute from attribute
router.get('/values/:attributeID', product.fetch);

// get categories of a department
router.get('/inProduct/:productID', product.fetch);


export default router;
