import express from 'express';
import Attribute from '../../../controllers/attributes';

const router = express.Router();

// create car instance
const attribute = new Attribute();

// get all attributes
router.get('/', attribute.allAttributes);

// get one attribute by ID
router.get('/:attributeID(\\d+)', attribute.singleAttribute);

// get values of attribute from attribute
router.get('/values/:attributeID(\\d+)', attribute.attributeValues);

// get categories of a department
router.get('/inProduct/:productID(\\d+)', attribute.allAttributes);


export default router;
