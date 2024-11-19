import { Users } from "../model/userModel.js";
import { CheckUser ,InsertUser} from "../services/userService.js";
// @ userSignup
// @ /user/postSignup
export const postSignup = async (req, res) => {
    try {
      let { password, email, username } = req.body;
      let previousUser = await CheckUser(email)
      if (previousUser) {
        res
          .status(400)
          .json({ status: false, response: "email already exist" });
        return;
      } 
      else {
            let user = await InsertUser( email, password,username)
            if (user) {
              res.status(200).json({ status: true,response: "new user created" });
              return;
            } else {
              res.status(400).json({ status: false, response: "failed to create user" });
              return;
            } 
      }
    }
     catch (error) {
      res.status(400).json({ status: false, response: "something went wrong" });
    }
  };
  

  // @  user login
// @ /user/postLogin
export const postLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await CheckUser(email)
      if (user) {
        if (password===user.dataValues.password) {
            console.log('user logged');
          return res.status(200).json({ status: true, response: user.dataValues });
        }
         else {
            console.log('password not match');
            return res .status(401) .json({ status: false, response: "password not match" }); 
        }
      }
       else {
      return  res.status(401).json({ status: false, response: "email not match" });
      }
    }
     catch (error) {
      console.log(error);
      res.status(400).json({ status: false, response: "something went wrong" });
    }
  };

  // @  checking the user is already logged or not
// @ /user/Authentication
// export const auth=async(req,res)=>{
//     res.status(200).json({status:true,response:"alredy logged"});
   
//    }
