import express from 'express';
import User from '../../../controllers/user';

const router = express.Router();

// create instance for the user class 
const user = new User();

// update customer
router.put('/', user.signup);

// get customer by token
router.get('/', user.login)

// signup user
router.post('/', user.signup)

// login user
router.post('/login', user.login)

// facebook authentication
router.post('/', user.login)


// update customer address
router.put('/', user.login)

// update customer credit card
router.put('/creditCard', user.login)



export default router;