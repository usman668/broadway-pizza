import express from "express";
import { signUp , logIn} from "../controller/auth.js";
let userRoute = express.Router();


userRoute.post('/signup', signUp)
userRoute.post('/login',logIn)

export {userRoute}