import { AddToCartModel } from '../Models/ATCartSchema.js';
import MongoDbPkg from 'mongodb';
const { ObjectId } = MongoDbPkg;

// Add product in cart:-

const addProductCart = async (req, resp) => {
  let data = new AddToCartModel(req.body);
  try {
    let saveData = await data.save();
    resp.send(saveData);
  } catch (error) {
    resp.send(error);
  }
};

// Get Cart Products:-

const getProductCart = async (req, resp) => {
  try {
    let products = await AddToCartModel.aggregate([
      {
        $match: {},
      },
    ]);
    resp.send(products);
  } catch (error) {
    resp.send(error);
  }
};

// Delete Product:-

const cartDelete = async (req, resp) => {
  try {
    let deleteProduct = await AddToCartModel.findByIdAndDelete({
      _id: req.params.id,
    });
    resp.send(deleteProduct);
  } catch (error) {
    resp.send(error);
  }
};

export { addProductCart, getProductCart, cartDelete };
