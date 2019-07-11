/* eslint-disable max-len */
/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import Sequelize from 'sequelize';
import models from '../models/index';
import ReviewSelector from '../helpers/reviewSelectore';

const {
  product: productModel, product_category: ProductCategoryModel,
  review: ReviewModel, category: CategoryModel
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
      const products = await productModel.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
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
  async FindSingleProduct(req, res) {
    try {
      const { id } = req.params;
      const product = await productModel.findOne({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        },
        where: { id }
      });
      if (product) {
        return res.status(200).json({
          status: 200,
          products: product.dataValues
        });
      }
      return res.status(404).json({
        status: 404,
        message: 'Product not found'
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
 * @returns {*} products in a category
 */
  async productInACategory(req, res) {
    try {
      const { categoryId } = req.params;
      const productsIdArray = [];
      const category = await CategoryModel.findOne({
        where: { id: categoryId }
      });
      if (!category) {
        return res.status(404).json({
          status: 404,
          message: 'category not found'
        });
      }
      const productsArray = await ProductCategoryModel.findAll({
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

      for (let i = 0; i < productsIdArray.length; i += 1) {
        productArray.push(getProducts(productsIdArray[i]));
      }
      const result = await Promise.all(productArray);
      return res.status(200).json({
        status: 200,
        category: category.dataValues.name,
        count: result.length,
        result
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
 * @returns {*} products in a department
 */
  async productInADepartment(req, res) {
    try {
      const { departmentId } = req.params;
      const categoriesForADepartment = [];
      const productsArray = await CategoryModel.findAll({ where: { department_id: departmentId } });
      productsArray.map(element => categoriesForADepartment.push(element.dataValues.id));
      // find categories in product_categories_table
      const getProductsCategories = async (category_id) => {
        const res = await ProductCategoryModel.findOne({ where: { category_id } });
        return res.dataValues;
      };
      const productCategoryArray = [];

      for (let i = 0; i < categoriesForADepartment.length; i += 1) {
        productCategoryArray.push(getProductsCategories(categoriesForADepartment[i]));
      }
      const productCategories = await Promise.all(productCategoryArray);

      // // product id's
      const productIds = [];
      productCategories.map(element => productIds.push(element.product_id));

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

      for (let i = 0; i < productIds.length; i += 1) {
        productArray.push(getProducts(productIds[i]));
      }
      const result = await Promise.all(productArray);
      res.status(200).json({
        status: 200,
        result
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
  // async productDetails(req, res) {
  //   try {
  //     const id = req.params.productId;
  //     const product = await productModel.findOne({ where: { id } });
  //     if (product != null) {
  //       res.status(400).json({
  //         status: 400,
  //         products: product.dataValues
  //       });
  //     }
  //   } catch (error) {
  //     res.status(400).json({
  //       status: 400,
  //       error: error.errors[0].message
  //     });
  //   }
  // }

  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  // async productLocation(req, res) {
  // try {
  //   const id = req.params.productId;
  //   const product = await productModel.findOne({ where: { id } });
  //   if (product != null) {
  //     res.status(400).json({
  //       status: 400,
  //       error: product.dataValues
  //     });
  //   }
  // } catch (error) {
  //   res.status(400).json({
  //     status: 400,
  //     error: error.errors[0].message
  //   });
  // }
  // }

  /**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  async productReview(req, res) {
    try {
      const { id } = req.params;
      const product = await ReviewModel.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        },
        where: { product_id: id }
      });
      res.status(200).json({
        status: 200,
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
  async createReview(req, res) {
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
      const result = new ReviewSelector(product).select();
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

  /**
   * @author frank harerimana
   * @param {*} req
   * @param {*} res
   * @returns {*} search
   */
  async search(req, res) {
    const { keyword } = req.params;
    const { Op } = Sequelize;
    try {
      const response = await productModel.findAll({
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        where: {
          [Op.or]: {
            name: { [Op.like]: `${keyword}` },
            description: { [Op.like]: `${keyword}` },
            price: { [Op.like]: `${keyword}` },
            image: { [Op.like]: `${keyword}` }
          }
        }
      });
      return res.status(200).json({
        response
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error,
      });
    }
  }
}

export default Product;
