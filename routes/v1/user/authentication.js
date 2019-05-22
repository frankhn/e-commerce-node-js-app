import express from 'express';
import passport from 'passport';
import Customer from '../../../controllers/customer';
import TokenValidator from '../../../middlewares/TokenValidator';

const router = express.Router();

// create instance for the customer class
const customer = new Customer();


// update customer
// router.put('/', (req, res, next) => {
//   new TokenValidator(req, res, next).verify();
// }, customer.updateAddress);


// get customer by token
router.get('/profile', (req, res, next) => {
  new TokenValidator(req, res, next).verify();
}, customer.profile);


// signup customer
router.post('/', customer.register);


// login customer
router.post('/login', customer.login);


// facebook authentication
router.get('/facebook', passport.authenticate('facebook', { scope: ['email'] }));
router.get(
  '/facebook/callback',
  passport.authenticate('facebook', { session: false, failureRedirect: '/auth/facebook' }),
  customer.socialLogin
);

// update customer address
router.put('/address', (req, res, next) => {
  new TokenValidator(req, res, next).verify();
}, customer.updateAddress);


// update customer credit card
router.put('/creditCard', (req, res, next) => {
  new TokenValidator(req, res, next).verify();
}, customer.updateCreditCard);

export default router;
