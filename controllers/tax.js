/* eslint-disable class-methods-use-this */
import models from '../models/index';

const { tax: taxModel } = models;

/**
 * Tax class
 */
class Tax {
/**
     * @author frank
     * @param {*} req
     * @param {*} res
     * @returns {*} user
     */
  async getAllTaxes(req, res) {
    try {
      const taxes = await taxModel.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        },
      });
      res.status(200).json({
        status: 200,
        count: taxes.length,
        rows: taxes,
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
  async getTaxById(req, res) {
    try {
      const { id } = req.params;
      const products = await taxModel.findOne({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        },
        where: {
          id
        }
      });
      res.status(200).json({
        status: 200,
        count: products.length,
        rows: products,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        error: `no such tax with ${req.params.id} ID found`,
      });
    }
  }
}

export default Tax;
