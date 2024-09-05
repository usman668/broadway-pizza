import express from 'express';
let productRoute = express.Router();

import {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchProduct
} from '../controller/product.js';


// Routes For Apis:-
productRoute.post('/addProduct', addProduct);
productRoute.get('/getProducts', getProducts);
productRoute.get('/getProduct/:id', getSingleProduct);
productRoute.patch('/updateProduct/:id', updateProduct);
productRoute.delete('/deleteProduct/:id', deleteProduct);

productRoute.post('/searchProduct', searchProduct);


export { productRoute };
