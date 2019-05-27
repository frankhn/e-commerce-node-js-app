/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import models from '../models/index';

const {
  attribute: AttributeModel, attribute_value: Attribute_valueModel,
  product_attribute: product_attributeModel
} = models;

/**
 * attributes class
 */
class Attributes {
/**
     * @author frank
     * @param {*} req
     * @param {*} res
     * @returns {*} attribute
     */
  async allAttributes(req, res) {
    try {
      const attributes = await AttributeModel.findAll();
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
     * @author frank
     * @param {*} req
     * @param {*} res
     * @returns {*} attribute
     */
  async singleAttribute(req, res) {
    try {
      const attributes = await AttributeModel.findOne({ where: { id: req.params.attributeID } });
      res.status(200).json({
        status: 200,
        list: attributes.dataValues,
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error,
      });
    }
  }

  /**
     * @author frank
     * @param {*} req
     * @param {*} res
     * @returns {*} attribute
     */
  async attributeValues(req, res) {
    try {
      const attributes = await Attribute_valueModel.findOne({
        where: { attribute_id: req.params.attributeID }
      });
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
     * @author frank
     * @param {*} req
     * @param {*} res
     * @returns {*} attribute
     */
  async attributesWithProductId(req, res) {
    try {
      const attributes = await product_attributeModel.findOne({
        where: { product_id: req.params.attributeID }
      });
      if (attributes.dataValues) {
        const attributeIDs = [];
        for (let i = 0; i < attributes.dataValues.length; i += 1) {
          attributes.map(id => attributeIDs.push(id.dataValues.attribute_value_id));
        }
        const attribute = [];
        const res = await Promise.all(attributeIDs);
        for (let i = 0; i < res.length; i += 1) {
          AttributeModel.findOne({ where: { attribute_id: res[i] } });
        }
        const result = await Promise.all(attribute);
        res.status(200).json({
          status: 200,
          list: result,
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: 'no attributes yet',
      });
    }
  }
}

export default Attributes;
