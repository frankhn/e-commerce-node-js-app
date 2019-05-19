import express from 'express';
import Product from '../../../controllers/product';

const router = express.Router();

// create car instance
const product = new Product();

// get all products
router.get('/', product.create);

// search products
router.get('/search', product.fetch)

// get one product
router.get('/:id', product.fetch)

// products in a category
router.get('/inCategory/:categoryId', product.fetch)

// products in a department
router.get('inDepartment/:departmentId', product.fetch)

// product details
router.get(':id/details', product.fetch)

// locations of a product
router.get(':id/locations', product.fetch)

// reviews of a product
router.get(':id/reviews', product.fetch)

// create reviews
router.post(':id/reviews', product.fetch)


export default router;