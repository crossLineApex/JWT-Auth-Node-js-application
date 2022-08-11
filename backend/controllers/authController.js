const User = require("../models/userSchema");
const  mongoose = require("mongoose");
const jwt = require("jsonwebtoken");


/*
 api : /api/auth/register
 payload:
      {
             "name": "Dominoes",
             "email": "dominoes@fyi.com",
             "password": "dominoes",
             "type": "seller"
      }
*/
async function register(req,res) {

    const {name,email,password,type} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        type
    });

    if (user) {
        res.status(201).json({
          name:user.name,
          token: generateToken(user)
        })
      } else {
        res.status(400)
        throw new Error('Invalid user data');
      }

};

/*
api: /api/auth/login

just pass the token as header in the api call, the token object will come from route /api/auth/register
*/

async function login(req,res) {
  if(req.user){
    res.json({message: "Successful login"})
  }else{
    res.json({message: 'Unable to login'});
  }
}

const generateToken = (data) => {
  //not checking for matching email and password in db as I made it simple with just jwt token
  return jwt.sign({data}, 'secret', {// could use dotenv
    expiresIn: '30d',
  })
}

module.exports = {register,login};