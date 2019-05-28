/* eslint-disable camelcase */
/* eslint-disable class-methods-use-this */
import jwt from 'jsonwebtoken';
import 'dotenv/config';
import models from '../models/index';
import UserDataResponse from '../helpers/UserDataResponse';
import { comparePassword } from '../helpers/Encryption';

const { customer: CustomerModel } = models;
/**
 * customer controller
 */
class Customer {
  /**
     * @author frank
     * @param {*} req
     * @param {*} res
     * @returns {*} user
     */
  async register(req, res) {
    try {
      const {
        name, email, password
      } = req.body;
      const NewUser = {
        name,
        email,
        password,
      };
      let user = await CustomerModel.create(NewUser);
      if (user) {
        user = new UserDataResponse(user).select();
        const token = jwt.sign({ user }, process.env.SECRETKEY);
        res.status(201).json({
          status: 201,
          user,
          accessToken: `Bearer ${token}`
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        error: error.errors[0].message
      });
    }
  }

  /**
  * @author frank harerimana
  * @param {*} req
  * @param {*} res
  * @returns {*} user
  */
  async login(req, res) {
    try {
      const { email, password } = req.body;
      let customer = await CustomerModel.findOne({ where: { email } });
      if (customer.dataValues) {
        const verify = comparePassword(password, customer.dataValues.password);
        if (verify === true) {
          customer = new UserDataResponse(customer.dataValues).select();
          const token = jwt.sign({ customer }, process.env.SECRETKEY);
          res.status(201).json({
            status: 201,
            customer,
            accessToken: `Bearer ${token}`
          });
        } else {
          res.status(201).json({
            status: 201,
            message: 'incorrect credentials'
          });
        }
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: 'invalid email or password'
      });
    }
  }


  /**
  * @author frank harerimana
  * @param {*} req
  * @param {*} res
  * @returns {*} profile
  */
  async profile(req, res) {
    try {
      let customer = await CustomerModel.findOne({ where: { id: req.user.id } });
      if (customer) {
        customer = new UserDataResponse(customer).select();
        const token = jwt.sign({ customer }, process.env.SECRETKEY);
        res.status(200).json({
          status: 200,
          customer,
          accessToken: `Bearer ${token}`
        });
      }
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: 'bad request'
      });
    }
  }


  /**
  * @author frank harerimana
  * @param {*} req
  * @param {*} res
  * @returns {*} user
  */
  async socialLogin(req, res) {
    try {
      const ruser = {
        username: req.user.username,
        email: req.user.email,
      };
      let customer = await CustomerModel.create(ruser);
      customer = new UserDataResponse(customer.dataValues).select();
      const token = jwt.sign({ customer }, process.env.SECRETKEY);
      return res.redirect(`${process.env.FRONTEND_URL}?token=${token}`);
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error.errors[0].message
      });
    }
  }

  /**
  * @author frank harerimana
  * @param {*} req
  * @param {*} res
  * @returns {*} user
  */
  async updateCreditCard(req, res) {
    const { credit_card } = req.body;
    try {
      const { id } = req.user;
      await CustomerModel.update(
        { credit_card }, { where: { id } }
      );
      let customer = await CustomerModel.findOne({ where: { id } });
      customer = new UserDataResponse(customer.dataValues).select();
      res.status(201).json({
        status: 201,
        customer
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error.message
      });
    }
  }

  /**
  * @author frank harerimana
  * @param {*} req
  * @param {*} res
  * @returns {*} user
  */
  async updateAddress(req, res) {
    try {
      const {
        address_1, address_2, city, country, postal_code,
        shipping_region_id, day_phone, eve_phone, mob_phone
      } = req.body;
      const customer = await CustomerModel.update(
        { address_1 },
        { address_2 },
        { city },
        { country },
        { postal_code },
        { shipping_region_id },
        { day_phone },
        { eve_phone },
        { mob_phone }, { where: { id: req.user.id } }
      );
      res.status(201).json({
        status: 201,
        customer: new UserDataResponse(customer.dataValues).select()
      });
    } catch (error) {
      res.status(400).json({
        status: 400,
        message: error.errors[0].message
      });
    }
  }
}

export default Customer;
