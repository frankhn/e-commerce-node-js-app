/* eslint-disable class-methods-use-this */
import Stripe from 'stripe';

const stripe = Stripe('sk_test_lomdOfxbm7QDgZWvR82UhV6D');
/**
 * Payment integration with stripe
 */
class Payment {
  /**
   * @param {*} req
   * @param {*} res
   * @returns {*} charge
   */
  async charge(req, res) {
    stripe.customers
      .create({
        email: req.body.email,
        // order: req.body.order_id,
        description: req.body.description
      })
      .then(customer => stripe.customers.createSource(customer.id, {
        source: 'tok_visa',
      }))
      .then(source => stripe.charges.create({
        amount: req.body.amount,
        currency: req.body.currency || 'usd',
        customer: source.customer,
      }))
      .then((charge) => {
        res.status(200).json({
          status: 200,
          charge
        });
      })
      .catch((err) => {
        res.status(400).json({
          status: 400,
          err
        });
      });
  }
}

export default Payment;
