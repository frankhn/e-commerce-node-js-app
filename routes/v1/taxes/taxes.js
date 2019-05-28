import express from 'express';
import Tax from '../../../controllers/tax';

const router = express.Router();

// create car instance
const tax = new Tax();

// get all taxes
router.get('/', tax.getAllTaxes);

// get tax tax by id
router.get('/:id(\\d+)', tax.getTaxById);


export default router;
