import express from 'express';
import Shipping from '../../../controllers/shipping';

const router = express.Router();

// create car instance
const shipping = new Shipping();

// shipping regions
router.get('/regions', shipping.everythingAboutShipping);

// get shipping region
router.get('/:shippingRegionID(\\d+)', shipping.shippingRegions);


export default router;
