
 import express from "express";
 import { email_validator } from "../middleWares/validator.js";
 import { password_validator } from "../middleWares/validator.js";
 const userRouter = express.Router();
 import { postSignup,postLogin } from "../controllers/userController.js";

 userRouter.post(
    "/postSignup", postSignup
  );
 userRouter.post(
    "/postLogin", postLogin
  );

 export default userRouter 

