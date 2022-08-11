const mongoose = require("mongoose");
const Catalog = require('./catalogSchema');

// this will ensure that we dont hit the bottleneck of 16mb limit for documents
// could create an product embedded document inside catalog but with time the products might increase
// and we might hit the limit some time later
const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price:{
        type: Number,
        required: true
    },
    catalog_id:{
        type: mongoose.Types.ObjectId, 
        ref: "Catalog"
    }
  },
  {
    timestamps: true,
  }
)

const Product = mongoose.model('Product', productSchema)

module.exports =  Product;