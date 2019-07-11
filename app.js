import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { errors } from 'celebrate';
import routes from './routes/index';

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // for only parsing incoming data
app.use(bodyParser.json());// accept json data
// redirect to the routes
app.use('/api', routes);
app.use(cors());
// accept static files
app.use(express.static(`${__dirname}/`));
app.use((express.json()));

app.use(errors());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin,X-Requested-With,Content-Type,Accept,Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, PATCH');
    return res.status(200).json({});
  }
  return next();
});

app.use((req, res, next) => {
  res.status(404).json({
    status: 404,
    message: 'API Endpoint not found'
  });
  next();
});

export default app;
