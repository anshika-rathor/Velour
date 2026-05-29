const jwt = require("jsonwebtoken");

const protect = (req,res,next)=>{
    if(!req.headers.authorization)return res.status(401).json({message:"No Token received"});
 const token = req.headers.authorization.split(" ")[1];
 
 try{
     const valid = jwt.verify(token,process.env.JWT_SECRET);
     req.user = valid;
     next();
 }
 catch{
  return res.status(401).json({message:" Invalid Token !"});
 }
}
module.exports = {protect} ; 
