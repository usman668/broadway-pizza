import mongoose from "mongoose";
const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true
        },
        phone_no:{
            type:Number,
            required:true 
        },
        email:{
            type:String,
            required:true
        }
    }
);
let userModel = mongoose.model('AuthenticateUser', userSchema);
export {userModel}