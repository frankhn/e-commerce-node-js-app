import express from 'express';
import user from './v1/user/authentication';
import product from './v1/product/product';
// import orders from './v1/order/order';
// import shoppingCart from './v1/shoppingCart/cart';
// import taxes from './v1/taxes/taxes';
// import departments from './v1/department/department';
// import categories from './v1/category/category';
import attributes from './v1/attributes/attributes';

const app = express();

// app.use('/departments', departments);
// app.use('/categories', categories);
app.use('/attributes', attributes);
app.use('/customer', user);
app.use('/products', product);
// app.use('/orders', orders);
// app.use('/shoppingCart', shoppingCart);
// app.use('/tax', taxes);
// app.use('/shipping', taxes);

export default app;
