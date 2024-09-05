import express from 'express';
import {
  addProductCart,
  getProductCart,
  cartDelete,
} from '../controller/AddToCPro.js';
let CartRoute = express.Router();

// Routes For Apis:-
CartRoute.post('/addCart', addProductCart);
CartRoute.get('/getCart', getProductCart);
CartRoute.delete('/deleteCart/:id', cartDelete);

export { CartRoute };
