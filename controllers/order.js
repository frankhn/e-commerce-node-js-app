/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import models from '../models/index';
import CreateOrderSelector from '../helpers/createOrderSelector';

const {
  order: orderModel, shopping_cart: cartModel, product: productModel
} = models;

/**
 * product class
 */
class Order {
/**
 * @author frnk harerimana
 * @param {*} req
 * @param {*} res
 * @returns {*} products
 */
  async ordersByCustomer(req, res) {
    try {
      const products = await orderModel.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt',
            'reference',
            'auth_code'
          ]
        },
      });
      res.status(200).json({
        status: 200,
        count: products.length,
        rows: products,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        error: error.errors[0].message,
      });
    }
  }

  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  async orderById(req, res) {
    try {
      const { id } = req.params;
      const product = await orderModel.findOne({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        },
        where: { id }
      });
      if (product != null) {
        return res.status(200).json({
          status: 200,
          products: product.dataValues
        });
      }
      return res.status(404).json({
        status: 404,
        message: 'invalid order id'
      });
    } catch (error) {
      res.status(200).json({
        status: 200,
        error: error.errors[0].message
      });
    }
  }

  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} products in a category
 */
  async orderShortDetails(req, res) {
    try {
      const { categoryId } = req.params;
      const productsIdArray = [];
      const productsArray = await orderModel.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        },
        where: { category_id: categoryId }
      });
      productsArray.map(element => productsIdArray.push(element.dataValues.product_id));
      // find products
      const getProducts = async (id) => {
        const res = await orderModel.findOne({
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt'
            ]
          },
          where: { id }
        });
        return res.dataValues;
      };
      const productArray = [];

      for (let i = 0; i < productsIdArray.length; i += 1) {
        productArray.push(getProducts(productsIdArray[i]));
      }
      const result = await Promise.all(productArray);
      res.status(400).json({
        status: 400,
        result
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        error: error.errors[0].message
      });
    }
  }

  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  async createOrder(req, res) {
    try {
      const customer_id = req.user.id;
      const {
        cart_id, shipping_id, tax_id, comment
      } = req.body;
      const digits = cart_id.toString().length;
      if (cart_id == null || shipping_id == null || tax_id == null) {
        return res.status(400).json({
          status: 400,
          message: 'fields are required'
        });
      }
      if (digits > 4) {
        return res.status(400).json({
          status: 400,
          message: 'invalid cart_id'
        });
      }
      const cart = await cartModel.findOne({ where: { cart_id } });
      if (!cart) {
        return res.status(404).json({
          status: 404,
          message: `No cart found with ID ${cart_id}`
        });
      }
      const cartProduct = [];
      const cartProducts = await cartModel.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        },
        where: { cart_id }
      });
      cartProducts.map(element => cartProduct.push(element.dataValues.product_id));
      // find products
      const getProducts = async (id) => {
        const res = await productModel.findOne({
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt'
            ]
          },
          where: { id }
        });
        return res.dataValues;
      };
      const productArray = [];
      for (let i = 0; i < cartProduct.length; i += 1) {
        productArray.push(getProducts(cartProduct[i]));
      }
      const products = await Promise.all(productArray);
      const amounts = [];
      products.map((element) => {
        const priceAmount = element.price;
        const convertToNumber = parseFloat(priceAmount);
        return amounts.push(convertToNumber);
      });
      const summation = (total, num) => total + num;
      const total_amount = amounts.reduce(summation);

      const order = {
        cart_id, shipping_id, tax_id, comment, customer_id, total_amount
      };
      const response = await orderModel.create(order);
      const result = new CreateOrderSelector(response).select();
      res.status(201).json({
        status: 201,
        data: result
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        error
      });
    }
  }
}

export default Order;
