import express from 'express';
import Product from '../../../controllers/product';
import TokenValidator from '../../../middlewares/TokenValidator';

const router = express.Router();

// create car instance
const product = new Product();

// get all products
router.get('/', product.allProducts);

// search products
router.get('/search?keyword=', product.search);

// get one product
router.get('/:id(\\d+)', product.FindSingleProduct);

// products in a category
router.get('/inCategory/:categoryId(\\d+)', product.productInACategory);

// products in a department
router.get('/inDepartment/:departmentId(\\d+)', product.productInADepartment);

// product details
// router.get('/:id/details', product.allProducts);

// locations of a product
// router.get('/:id/locations', product.allProducts);

// reviews of a product
router.get('/:id(\\d+)/reviews', product.productReview);

// create reviews
router.post('/:id(\\d+)/reviews', (req, res, next) => {
  new TokenValidator(req, res, next).verify();
}, product.createReview);


export default router;
