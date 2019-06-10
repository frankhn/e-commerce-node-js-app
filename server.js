import dotenv from 'dotenv';
import app from './app';

dotenv.config();

const port = process.env.PORT || 8000;

app.listen(port);

export default app;
