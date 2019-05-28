/* eslint-disable class-methods-use-this */

import models from '../models/index';

const { category: CategoryModel, product_category: ProductCategoryModel } = models;

/**
 * Category class
 */
class Category {
  /**
 * @author frank harerimana
 * @param {*} req
 * @param {*} res
 * @returns {*} categories
 */
  async Categories(req, res) {
    try {
      const categories = await CategoryModel.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        },
      });
      res.status(200).json({
        status: 200,
        list: categories,
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
 * @returns {*} category
 */
  async FindSingleCategory(req, res) {
    try {
      const { categoryID } = req.params;
      const category = await CategoryModel.findOne({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        },
        where: { id: categoryID }
      });
      if (category != null) {
        res.status(200).json({
          status: 200,
          category
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
 * @returns {*} categories
 */
  async productCategories(req, res) {
    try {
      const { productID } = req.params;
      const categoryIDS = [];
      const categories = await ProductCategoryModel.findAll({ where: { product_id: productID } });
      categories.map(element => categoryIDS.push(element.category_id));

      const getProducts = async (id) => {
        const res = await CategoryModel.findOne({
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
      const categoriesArray = [];

      for (let i = 0; i < categoryIDS.length; i += 1) {
        categoriesArray.push(getProducts(categoryIDS[i]));
      }
      const result = await Promise.all(categoriesArray);
      res.status(200).json({
        status: 200,
        category: result
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
 * @returns {*} category
 */
  async categoriesInADepartment(req, res) {
    try {
      const { departmentID } = req.params;
      const categories = await CategoryModel.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        },
        where: { department_id: departmentID }
      });
      res.status(200).json({
        status: 200,
        count: categories.length,
        response: categories
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        error
      });
    }
  }
}

export default Category;
