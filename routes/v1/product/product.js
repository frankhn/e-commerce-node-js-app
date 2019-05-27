import express from 'express';
import Product from '../../../controllers/product';

const router = express.Router();

// create car instance
const product = new Product();

// get all products
router.get('/', product.allProducts);

// search products
router.get('/search?key=', product.allProducts);

// get one product
router.get('/:id', product.allProducts);

// products in a category
router.get('/inCategory/:categoryId', product.allProducts);

// products in a department
router.get('inDepartment/:departmentId', product.allProducts);

// product details
router.get(':id/details', product.allProducts);

// locations of a product
router.get(':id/locations', product.allProducts);

// reviews of a product
router.get(':id/reviews', product.allProducts);

// create reviews
router.post(':id/reviews', product.allProducts);


export default router;
