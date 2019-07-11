import express from 'express';
import cheke from 'cheke';
import Payment from '../../../controllers/payment';

const router = express.Router();

// create car instance
const payment = new Payment();

router.post('/charge', cheke({
  body: {
    email: 'required|email',
    amount: 'required|integer',
    order_id: 'required|integer',
    description: 'required|string|min:10|max:100',
    currency: 'string|min:2|max:5'
  }
}), payment.charge);

router.post('/webHooks', payment.charge);


export default router;
