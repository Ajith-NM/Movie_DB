export const email_validator = async (req, res, next) => {
 if (req.body.email) {
    next()
 }
 else{
    console.log("no email");
    res.status(400).json({ status: false,response: "no email provided"});
 }
};

export const password_validator = async (req, res, next) => {
    if (req.body.password) {
        next()
     }
     else{
        console.log("no password");
        res.status(400).json({ status: false,response: "no password provided"});
     }
};
