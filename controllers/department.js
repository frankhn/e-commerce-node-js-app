/* eslint-disable class-methods-use-this */
import models from '../models/index';

const { department: deparmentModel } = models;
/**
 * Shipping class
 */
class Department {
/**
 * @author frank
 * @param {*} req
 * @param {*} res
 * @returns {*} attribute
 */
  async allDepartments(req, res) {
    try {
      const departments = await deparmentModel.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        }
      });
      res.status(200).json({
        status: 200,
        data: departments
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
  async department(req, res) {
    try {
      const { departmentID } = req.params;
      const department = await deparmentModel.findAll({
        attributes: {
          exclude: [
            'createdAt',
            'updatedAt'
          ]
        },
        where: { id: departmentID }
      });
      res.status(200).json({
        status: 200,
        data: department
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error
      });
    }
  }
}

export default Department;
