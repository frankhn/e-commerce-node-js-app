import express from 'express';
import TokenValidator from '../../../middlewares/TokenValidator';
import Order from '../../../controllers/order';
import validation from '../../validations/order/order.validation'
import { celebrate } from 'celebrate';

const router = express.Router();

// create car instance
const order = new Order();

// create order
router.post('/', (req, res, next) => {
  new TokenValidator(req, res, next).verify();
}, celebrate({ body: validation }), order.createOrder);

// get info about order
router.get('/:id(\\d+)', (req, res, next) => {
  new TokenValidator(req, res, next).verify();
}, order.orderById);


// get orders by customer
router.get('/inCustomer', (req, res, next) => {
  new TokenValidator(req, res, next).verify();
}, order.ordersByCustomer);

// get shortDetails
router.get('/shortDetails/:id(\\d+)', (req, res, next) => {
  new TokenValidator(req, res, next).verify();
}, order.orderShortDetails);

export default router;
