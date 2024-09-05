import mongoose from 'mongoose';

let orderSchema = new mongoose.Schema(  
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'AuthenticateUser',
            required:true
        },
        items:[
            {
                productId:{
                    type:mongoose.Schema.Types.ObjectId,
                    ref:'Product',
                    required:true
                },
                quantity:{
                    type:Number
                },
                price:{
                    type:Number 
                }
            }
        ],
        totalAmount:{
            type:Number,
        },
        status:{
            type:String,
            default:'Pending'
        },
        createdAt:{
            type:Date,
            default: Date.now()
        }
     }
 )

let orderModel = mongoose.model('Order', orderSchema);
export {orderModel}