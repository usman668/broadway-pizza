import { orderModel } from "../Models/orderSchema.js";
import { productModel } from "../Models/productSchema.js";

// New Order
const placeOrder = async (req, resp) => {
  try {
    const { userId, items } = req.body;
    let totalAmount = 0;
    for (let item of items) {
      const product = await productModel.findById(item.productId);
     if (!product) {
        return resp.status(404).json({ error: 'Product not found' });
      }
      const price = product.price;
      const quantity = item.quantity;
      if (quantity <= 0) {
        return resp.status(400).json({ error: 'Invalid quantity' });
      }
      totalAmount += price * quantity;
    }

      const order = new orderModel({
      userId,
      items,
      totalAmount
    });
    const savedOrder = await order.save();
    resp.status(201).json(savedOrder);
  } catch (error) {
    resp.status(500).json({ error: 'Internal server error' });
  }
};

// Get All Orders:-

const getOrders = async (req,resp)=>{
    try {
        let orders = await orderModel.aggregate( [
            {
                $match:{  }
            }
        ] );
        resp.send(orders)
    } catch (error) {
        resp.send(error)
    }
}

 // Update Order:-

 const updateOrder = async (req, resp) => {
    try {
      let orderId = req.params.orderId;
      let { items } = req.body;
      let order = await orderModel.findById(orderId);
      if (!order) {
        return resp.status(404).json({ error: 'Order not found' });
      }
  
      let totalAmount = 0;
      for (let item of items) {
        const product = await productModel.findById(item.productId);
        if (!product) {
          return resp.status(400).json({ error: `Product with ID ${item.productId} not found` });
        }
        
        const price = parseFloat(product.price);
        if (isNaN(price)) {
          return resp.status(400).json({ error: 'Invalid product price' });
        }
        
        const quantity = parseInt(item.quantity, 10);
        if (isNaN(quantity) || quantity <= 0) {
          return resp.status(400).json({ error: 'Invalid quantity' });
        }
  
        totalAmount += price * quantity;
      }
      order.items = items;
      order.totalAmount = totalAmount;
      const updatedOrder = await order.save();
      resp.status(200).json(updatedOrder);
    } catch (error) {
      resp.status(500).json({ error: 'Internal server error' });
    }
  };

// Order Delete:-

const cancelOrder = async (req, resp) => {
    try {
      const orderId = req.params.orderId;
      const order = await orderModel.findById(orderId);
      if (!order) {
        return resp.status(404).json({ error: 'Order not found' });
      }
     if (order.status === 'canceled') {
        return resp.status(400).json({ error: 'Order is already canceled' });
      }
     order.status = 'canceled'; 
  
      
      const updatedOrder = await order.save();
      resp.status(200).json(updatedOrder);
    } catch (error) {
      resp.status(500).json({ error: 'Internal server error' });
    }
  };


export { placeOrder, getOrders, updateOrder, cancelOrder };
