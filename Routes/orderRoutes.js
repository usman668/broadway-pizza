import express from "express";
import {placeOrder, getOrders, updateOrder, cancelOrder} from "../controller/orderCon.js";
let orderRoute = express.Router();

orderRoute.post('/placeorder', placeOrder );
orderRoute.get('/getorders', getOrders)
orderRoute.put('/updateorder/:orderId', updateOrder)
orderRoute.delete('/cancelorder/:orderId', cancelOrder)

export {orderRoute}