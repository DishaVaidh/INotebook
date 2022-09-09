var jwt = require('jsonwebtoken')
const JWT_SECRET = "Iamgoodgirl";

const fetchuser=(req,res,next)=>{//at the end in middleware next call
    //get the user from the jwttoken and add id to req object
    const token = req.header('auth-token')//we pass token in header
    if(!token){
        res.status(401).send({error : "Please authenticate using a valid token"})
    }
    try{
    const data = jwt.verify(token,JWT_SECRET)
    req.user = data.user;
    next();
    }
    catch{
        res.status(401).send({error : "Please authenticate using a valid token"})
    }
}
module.exports= fetchuser;