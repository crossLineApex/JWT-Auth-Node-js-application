const mongoose = require("mongoose");
const User = require('./userSchema');
const Product = require('./productSchema')

const orderSchema = mongoose.Schema(
  {
    products:[{
        type: mongoose.Types.ObjectId, 
        ref: "Product"
    }],
    seller_id:{
        type: mongoose.Types.ObjectId, 
        ref: "User"
    },
    buyer_id:{
        type: mongoose.Types.ObjectId, 
        ref: "User"
    },

  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

module.exports =  Order;