import faker from 'faker';
import chai from 'chai';
import chaiHttp from 'chai-http';
import debug from 'debug';
import server from '../server';


chai.use(chaiHttp);
chai.should();

const logError = debug('*');

describe('Customer.js', () => {
  const fakeCustomer = {
    name: 'fakeName',
    email: faker.internet.email(),
    password: 'Ecommerce@123'
  };
  let token;
  it(' should be able to register a customer', async () => {
    try {
      const result = await chai
        .request(server)
        .post('/api/customer')
        .send(fakeCustomer);
      result.body.should.have.status(201);
      result.body.should.be.a('object');
      result.body.should.have.property('user');
    } catch (error) {
      logError(error);
    }
  });

  it(' should return a validation error', async () => {
    try {
      const fakedCustomer = {
        email: 'faker.com',
        password: '',
        name: ''
      };
      const result = await chai
        .request(server)
        .post('/api/customer')
        .send(fakedCustomer);
      result.body.should.have.status(400);
      result.body.should.be.a('object');
      result.body.should.have.property('error');
    } catch (error) {
      logError(error);
    }
  });

  it(' should be able to log in a customer', async () => {
    try {
      const fakedCustomer = {
        email: fakeCustomer.email,
        password: fakeCustomer.password
      };
      const result = await chai
        .request(server)
        .post('/api/customer/login')
        .send(fakedCustomer);
      token = result.body.accessToken;
      result.body.should.have.status(201);
      result.body.should.be.a('object');
    } catch (error) {
      logError(error);
    }
  });

  it(' should return a wrong credential error', async () => {
    try {
      const fakedCustomer = {
        email: fakeCustomer.email,
        password: 'randomPassword'
      };
      const result = await chai
        .request(server)
        .post('/api/customer/login')
        .send(fakedCustomer);
      token = result.body.accessToken;
      result.body.should.have.status(201);
      result.body.should.be.a('object');
    } catch (error) {
      logError(error);
    }
  });

  it(' should be able return customer profile', async () => {
    try {
      const result = await chai
        .request(server)
        .get('/api/customer/profile')
        .set('Authorization', `${token}`);
      result.body.should.have.status(200);
      result.body.should.be.a('object');
      result.body.should.have.property('customer');
    } catch (error) {
      logError(error);
    }
  });

  it(' should be able update credit card', async () => {
    try {
      const fakedCustomer = {
        credit_card: 378282246310005,
      };
      const result = await chai
        .request(server)
        .put('/api/customer/creditCard')
        .send(fakedCustomer)
        .set('Authorization', `${token}`);
      result.body.should.have.status(201);
      result.body.should.be.a('object');
      result.body.should.have.property('customer');
    } catch (error) {
      logError(error);
    }
  });
});
