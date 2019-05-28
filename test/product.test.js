import chai from 'chai';
import chaiHttp from 'chai-http';
import debug from 'debug';
import server from '../server';


chai.use(chaiHttp);
chai.should();

const logError = debug('*');

describe('product.js', () => {
  it(' should be able to return all products', async () => {
    try {
      const result = await chai
        .request(server)
        .get('/api/products');
      result.body.should.have.status(200);
      result.body.should.be.a('object');
    } catch (error) {
      logError(error);
    }
  });

  it(' should return a single product not found', async () => {
    try {
      const result = await chai
        .request(server)
        .get('/api/products/2');
      result.body.should.have.status(404);
      result.body.should.be.a('object');
    } catch (error) {
      logError(error);
    }
  });

  it(' should be able to return products in a category, no category found', async () => {
    try {
      const result = await chai
        .request(server)
        .get('/api/products/inCategory/6');
      result.body.should.have.status(400);
      result.body.should.be.a('object');
    } catch (error) {
      logError(error);
    }
  });

  it(' should return a return products in a department', async () => {
    try {
      const result = await chai
        .request(server)
        .get('/api/products/inDepartment/2');
      result.body.should.have.status(200);
      result.body.should.be.a('object');
    } catch (error) {
      logError(error);
    }
  });

  it(' should be able return product reviews', async () => {
    try {
      const result = await chai
        .request(server)
        .get('/api/products/25/reviews');
      result.body.should.have.status(200);
      result.body.should.be.a('object');
    } catch (error) {
      logError(error);
    }
  });
});
