const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const Catalog = require("../models/catalogSchema");
const Order = require("../models/orderSchema");
const  mongoose = require("mongoose");

/*
api: /api/buyer/list-of-sellers
no payload
*/

async function getAllSellers(req,res){

    const allSellers = User.find({type: "seller"},(err,data) => {

        if(err){

            res.status(404).json({message: "Not found"});

        }else{

            res.status(200).json(data);

        }
    });
  
};

/*
api:    /api/buyer/seller-catalog/:seller_id
for e.g.: /api/buyer/seller-catalog/62f4cd38f1c18e7383987f6e
no payload
*/

async function getCatalog(req,res) {

    //req.params.seller_id
    const catalog = Catalog.find({seller_id:req.params.seller_id}, (err,data) => {
        if(err){

            res.status(404).json({message: "Not found"});

        }else{
            const catalog_id = data[0]._id;
            const products = Product.find({catalog_id}, (err,data) => {
                if(err){

                    res.status(404).json({message: "Not found"});
        
                }else{
                    res.status(200).json(data);
                }
            });

        }
    })
};

/*
api: /api/buyer/create-order/:seller_id  (protected)
for e.g.:  /api/buyer/create-order/62f4cd38f1c18e7383987f6e
pass the token in header

payload:
array of product ids
e.g: 
{
    "products": ["62f4ee1250f02f371f9783f5","62f4ee1250f02f371f9783f7"]
}
*/

async function placeOrder(req,res){

    req.params.seller_id = mongoose.Types.ObjectId(req.params.seller_id);
    req.user = mongoose.Types.ObjectId(req.user);
    const product_id = req.body.products.map(prod =>{
        return mongoose.Types.ObjectId(prod);
    })
    const order = {
        products: product_id,
        seller_id: req.params.seller_id,
        buyer_id: req.body.user
    }
    const createOrder = await Order.create(order);

    if(createOrder){
        res.status(201).json({
            message: "Order Placed Successfully",
            createOrder
        });
    }else{
        res.status(403);
    }

};


module.exports = {getAllSellers,getCatalog,placeOrder};