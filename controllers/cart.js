/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import models from '../models/index';
import UniqueId from '../helpers/UniqueID';

const {
  product: productModel, shopping_cart: cartModel,
  review: ReviewModel
} = models;

/**
 * product class
 */
class Cart {
/**
 * @author frnk harerimana
 * @param {*} req
 * @param {*} res
 * @returns {*} products
 */
  async addToCart(req, res) {
    try {
      const {
        cart_id, product_id, attributes, quantity, buy_now
      } = req.body;
      const product = await productModel.findOne({
        where: { id: product_id }
      });
      if (!product) {
        res.status(404).json({
          message: 'product not found'
        });
      }
      const cartProduct = [];
      const cart = await cartModel.findOne({
        where: { cart_id, product_id }
      });

      if (!cart) {
        await cartModel.create({
          cart_id, product_id, attributes, quantity, buy_now
        });
      }
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
      const result = await Promise.all(productArray);
      res.status(200).json({
        status: 200,
        products: result,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        error,
      });
    }
  }

  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  async updateCartByItem(req, res) {
    try {
      const { cartId } = req.params;
      const cartProduct = [];
      const { quantity, product_id } = req.body;
      const cart = await cartModel.findAll({
        where: { cart_id: cartId }
      });
      if (!cart) {
        res.status(200).json({
          status: 200,
          message: `no cart found with ID ${cartId}`
        });
      } else {
        await cartModel.update({ quantity },
          { where: { cart_id: cartId, product_id } });
        // update cart
        const cartProducts = await cartModel.findAll({
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt'
            ]
          },
          where: { cart_id: cartId }
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
        const Cart_Products = await Promise.all(productArray);
        res.status(201).json({
          status: 201,
          Cart_Products
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        error
      });
    }
  }

  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} products in a category
 */
  async emptyCart(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await cartModel.findOne({
        where: { cart_id: cartId }
      });
      if (!cart) {
        res.status(404).json({
          status: 404,
          message: `no cart found with ID ${cartId}`
        });
      } else {
        const emptyCart = await cartModel.destroy({
          where: { cart_id: cartId }
        });
        res.status(201).json({
          status: 201,
          emptyCart
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        error
      });
    }
  }

  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  async generateUniqueCartId(req, res) {
    try {
      const id = new UniqueId().uniqueId();
      res.status(200).json({
        status: 200,
        id
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        error
      });
    }
  }

  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  async listOfProductsInCart(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await cartModel.findOne({
        where: { cart_id: cartId }
      });
      if (!cart) {
        res.status(404).json({
          status: 404,
          message: `no cart found with ID ${cartId}`
        });
      } else {
        const cartProduct = [];
        const cartProducts = await cartModel.findAll({
          attributes: {
            exclude: [
              'createdAt',
              'updatedAt'
            ]
          },
          where: { cart_id: cartId }
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
        res.status(200).json({
          status: 200,
          products
        });
      }
    } catch (error) {
      res.status(200).json({
        status: 200,
        error
      });
    }
  }

  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  async MoveAProductToCart(req, res) {
    try {
      const product_id = req.params.id;
      const customer_id = req.user.id;
      const {
        review, rating
      } = req.body;
      const data = {
        customer_id, product_id, review, rating
      };
      const product = await ReviewModel.create(data);
      res.status(201).json({
        status: 201,
        data: product
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        error
      });
    }
  }

  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  async TotalAmountFromCart(req, res) {
    try {
      const { cartId } = req.params;
      const cart = await cartModel.findOne({
        where: { cart_id: cartId }
      });
      if (!cart) {
        res.status(404).json({
          status: 404,
          message: `no cart found with ID ${cartId}`
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
        where: { cart_id: cartId }
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
      const totals = amounts.reduce(summation);
      res.status(201).json({
        status: 201,
        Amount: totals
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        error
      });
    }
  }

  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  async saveProductForLater(req, res) {
    try {
      const product_id = req.params.id;
      const customer_id = req.user.id;
      const {
        review, rating
      } = req.body;
      const data = {
        customer_id, product_id, review, rating
      };
      const product = await ReviewModel.create(data);
      res.status(201).json({
        status: 201,
        data: product
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        error
      });
    }
  }


  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  async productsSavedFoLater(req, res) {
    try {
      const product_id = req.params.id;
      const customer_id = req.user.id;
      const {
        review, rating
      } = req.body;
      const data = {
        customer_id, product_id, review, rating
      };
      const product = await ReviewModel.create(data);
      res.status(201).json({
        status: 201,
        data: product
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        error
      });
    }
  }


  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  async removeProductInCart(req, res) {
    try {
      const product_id = req.params.id;
      const customer_id = req.user.id;
      const {
        review, rating
      } = req.body;
      const data = {
        customer_id, product_id, review, rating
      };
      const product = await ReviewModel.create(data);
      res.status(201).json({
        status: 201,
        data: product
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        error
      });
    }
  }
}

export default Cart;
