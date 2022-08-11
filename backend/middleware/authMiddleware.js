const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
async function protect(req,res,next){
  console.log("jwt auth");
    let token;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
      ) {
        try {
          token = req.headers.authorization.split(' ')[1]
          const decoded = await jwt.verify(token, 'secret');// could use dotenv
           req.user = await User.findById(decoded.data._id).select('-password')
          console.log(req.user);
            next()
        } catch (error) {
          console.error(error)
          res.status(401)
          //throw new Error('Not authorized, token failed')
        }
      }

      if (!token) {
        res.status(401)
        //throw new Error('Not authorized, no token')
      }

}

module.exports = protect;