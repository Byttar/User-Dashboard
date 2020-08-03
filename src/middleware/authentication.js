const jwt = require("jsonwebtoken");
const authCONF = require("../config/auth");

module.exports = async (req, res, next) => {

   const { auth } = req.headers;
    
   if(!auth){
       return res.status(401).json({error: true, message: "Token not provided :("})
   }

   const [bearer,token] = auth.split(" ");

   try{
       jwt.verify(token, authCONF.secret, (error, response) => {
           if(error || !response.access_level) return res.status(401).json({error: true, message: error});
           req.tokenID = response.id;
           return next();
       });

   }catch(ex){
       return res.status(401).json({error: true, message: "Token is invalid >:("})
   }

}