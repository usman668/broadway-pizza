import { userModel } from '../Models/authSchema.js';
import jwt from "jsonwebtoken";

// SignUp:

const signUp = async (req, resp) => {
  try {
    const { name, phone_no, email } = req.body;

    if (!name || !phone_no || !email) {
      return resp.status(400).send({ message: 'All fields are required' });
    }

    const dataCheck = await userModel.findOne({ email: email });
    if (dataCheck) {
      return resp.status(400).send({ message: 'Email already exists' });
    }

    const newUser = new userModel({ name, phone_no, email });
    const userSave = await newUser.save();
    let token = jwt.sign({userID:userSave._id},"SecreteKey",{expiresIn:"30days"})
    return resp.status(200) .send({ message: 'User saved successfully', user: userSave , "token":token});
  } catch (error) {
    return resp
      .status(500)
      .send({ message: 'Server error', error: error.message });
  }
};

// Login:-



let logIn = async (req, resp) => {
  try {
    let { name, email } = req.body;

    if (!name || !email) {
      return resp.status(400).send({ message: 'All fields are required' });
    } else {
      let dataCheck = await userModel.findOne({ email: email, name: name });
      if (!dataCheck) {
        return resp.status(400).send({ message: 'Email or Name is incorrect' });
      } else {
        let token = jwt.sign({userID:dataCheck._id},"SecreteKey",{expiresIn:"30days"})
        return resp.status(200).send({ message: 'Login Successfully', "token":token });
      }
    }
  } catch (error) {
    return resp
      .status(500)
      .send({ message: 'Server error', error: error.message });
  }
};

export { signUp, logIn };
