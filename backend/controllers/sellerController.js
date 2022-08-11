const User = require("../models/userSchema");
const Product = require("../models/productSchema");
const Catalog = require("../models/catalogSchema");
const Order = require("../models/orderSchema");
const  mongoose = require("mongoose");

/*
api:    /api/seller/create-catalog/:seller
for e.g:  /api/seller/create-catalog/62f4cd38f1c18e7383987f6e
payload e.g:

{
    "name": "Shanti store - Catalog",
    "products":[
        {
            "name": "Cadbury silk chocolate- 50g",
            "price": 20
        },
        {
              "name": "Choco Fills- 500g",
              "price": 350
        },
        {
              "name": "Protien Cereals - 1.5kg",
              "price": 890
        }
    ]
}

*/
// we can also ensure that only 1 catalog is created and not more as per the requirements
async function createCatalog(req,res) {// we can check if type:Seller is there or not
    req.params.seller = mongoose.Types.ObjectId(req.params.seller);
    const newcatalog = {
        name: req.body.name,
        seller_id: req.params.seller
    };

    const catalog = await Catalog.create(newcatalog);

    if(catalog && catalog._id){

        const products_to_add = req.body.products;
        const products = products_to_add.map(prod => {
            return {...prod, catalog_id: mongoose.Types.ObjectId(catalog._id)}
        });
        //console.log(products);

        const addProd = await Product.insertMany(products);

        if(addProd){
            res.status(201).json({
                success: true,
                message: "catalog created",
                catalog,
                addProd
            });
        }else{
            res.status(400)
            //throw new Error('Invalid Product data');
        }
      
    }else{
        res.status(400)
        //throw new Error('Invalid Catalog data');
    }
}

/*
api:        /seller/orders/:seller_id
for e.g.:  /seller/orders/62f4cd38f1c18e7383987f6e
no payload
*/
async function getOrders(req,res) {

    var populateQuery = [{path:'products', select:'price name'}, {path:'buyer_id', select:'name'}];


    const orders = await Order.find({seller_id: req.params.seller_id}).populate(populateQuery);

    if(orders){
        res.status(200).json(orders);
    }else{
        res.status(401);
    }
}

module.exports = {createCatalog,getOrders};