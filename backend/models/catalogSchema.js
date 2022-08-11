const mongoose = require("mongoose");
const User = require('./userSchema');

// this way we remove unnecessary fields in userSchema of creating catalog fields
// maps 1 seller to its catalog
const catalogSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    seller_id:{
        type: mongoose.Types.ObjectId, 
        ref: "User"
    }
  },
  {
    timestamps: true,
  }
)

const Catalog = mongoose.model('Catalog', catalogSchema)

module.exports =  Catalog;