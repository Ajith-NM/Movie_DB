
import { Users } from "../model/userModel.js";
import dotenv from "dotenv";

dotenv.config();

// check user already login or not
export const CheckUser = async (email) => {
  return new Promise((resolve, reject) => {
    Users.findOne({ where: { email: email } })
      .then((data) => {
        resolve(data);
      })
      .catch(() => {
        reject(false);
      });
  });
};

// insert a new user
export const InsertUser = async ( email,password,username) => {
  return new Promise((resolve, reject) => {
    Users.create({
      email: email,
      password: password,
      username:username,
    })
      .then(() => {
        resolve(true);
      })
      .catch(() => {
        reject(false);
      });
  });
};
