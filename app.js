import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // for only passing strings and arrays
app.use(bodyParser.json());// accept json data

// redirect to the routes
app.use('/api', routes);

// accept static files
app.use(express.static(`${__dirname}/`));
app.use((express.json()));

app.use((req, res) => {
  res.status(400).json({
    status: 400,
    message: 'Bad request'
  });
});

export default app;
