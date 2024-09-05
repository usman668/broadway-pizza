import { productModel } from '../Models/productSchema.js';
import MongoDbPkg from 'mongodb';
const { ObjectId } = MongoDbPkg;

// Add a new Product:-

const addProduct = async (req, resp) => {
  let productData = new productModel(req.body);
  try {
    let saveProductData = await productData.save();
    resp.send(saveProductData);
  } catch (error) {
    resp.send(error);
  }
};

// Get all Products:-

const getProducts = async (req, resp) => {
  try {
    let products = await productModel.aggregate([
      {
        $match: {},
      },
    ]);
    resp.send(products);
  } catch (error) {
    resp.send(error);
  }
};

// Get Single product by Id:-

const getSingleProduct = async (req, resp) => {
  try {
    let productId = req.params.id;
    let product = await productModel.aggregate([
      {
        $match: {
          _id: new ObjectId(productId),
        },
      },
    ]);
    resp.send(product);
  } catch (error) {
    resp.send(error);
  }
};

// Updating Product:-

let updateProduct = async (req, resp) => {
  let data = req.body;
  try {
    let updateData = await productModel.findByIdAndUpdate(
      { _id: req.params.id },
      data
    );
    resp.send(updateData);
  } catch (error) {
    resp.send(error);
  }
};

// Delete Product:-

let deleteProduct = async (req, resp) => {
  try {
    let deleteData = await productModel.findByIdAndDelete({
      _id: req.params.id,
    });
    resp.send(deleteData);
  } catch (error) {
    resp.send(error);
  }
};

// Search Product:-

const searchProduct = async (req,resp)=>{
 try {
  let {name} = req.body;
  if(!name){
    resp.status(400).send('Enter the name of product');
  }else{
      let products = await productModel.find( 
        {
          name:{$regex:name, $options:'i'}
        }
       )
       resp.status(200).json(products)
  }
 } catch (error) {
  resp.send(error)
 }
  
}

export {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  searchProduct
};
