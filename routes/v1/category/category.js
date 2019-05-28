import express from 'express';
import Category from '../../../controllers/category';

const router = express.Router();

// create car instance
const category = new Category();

// get all categories
router.get('/', category.Categories);

// get one category by ID
router.get('/:categoryID(\\d+)', category.FindSingleCategory);

// get category of a product
router.get('/inProduct/:productID(\\d+)', category.productCategories);

// get categories of a department
router.get('/inDepartment/:departmentID(\\d+)', category.categoriesInADepartment);


export default router;
