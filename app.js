import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';

import Connect from './connection/connect.js'; // Import the Connect function
import Router from './Routes/Router.js';
import setupSwagger from './swaggerConfig.js';

const app = express();
// Setup Swagger documentation
setupSwagger(app);
// Initialize MongoDB connection
Connect();

app.use(morgan('combined'));
app.use(helmet());
app.use(compression());
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.use('/auth', Router.SigninRouter);
app.use('/article', Router.articleRouter);
app.use('/product', Router.productRoute);
app.use('/cart', Router.CartRoute);
app.use('/user', Router.userRoute);
app.use('/order',Router.orderRoute)


export default app;
