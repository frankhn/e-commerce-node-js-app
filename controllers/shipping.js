/* eslint-disable class-methods-use-this */
import models from '../models/index';

const { shipping: shippingModel } = models;
/**
 * Shipping class
 */
class Shipping {
/**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  async everythingAboutShipping(req, res) {
    try {
      const shipping = await shippingModel.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        }
      });
      res.status(200).json({
        status: 200,
        data: shipping
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error
      });
    }
    return req;
  }

  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  async shippingRegions(req, res) {
    try {
      const shippingID = req.params.shippingRegionID;
      const shipping = await shippingModel.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        },
        where: { shipping_region_id: shippingID }
      });
      res.status(200).json({
        status: 200,
        data: shipping
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error
      });
    }
  }
}

export default Shipping;
