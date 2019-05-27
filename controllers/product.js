/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import models from '../models/index';

const {
  product: productModel
} = models;

/**
 * product class
 */
class Product {
/**
 * @author frnk harerimana
 * @param {*} req
 * @param {*} res
 * @returns {*} products
 */
  async allProducts(req, res) {
    try {
      const attributes = await productModel.findAll();
      res.status(200).json({
        status: 200,
        list: attributes,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error,
      });
    }
  }

  /**
 *
 * @param {*} req
 * @param {*} res
 */
  async create(req, res) {

  }

  /**
 *
 * @param {*} req
 * @param {*} res
 */
  async update(req, res) {

  }

  /**
 *
 * @param {*} req
 * @param {*} res
 */
  async delete(req, res) {

  }
}

export default Product;
