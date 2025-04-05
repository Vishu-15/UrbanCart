const Product = require("../models/product");

module.exports.getAllProducts = async(req,res)=>{
    try{
      const allProducts = await Product.find();
      res.json(allProducts);
    }
    catch(e){
      res.status(500).json(e.message);
    }
}

module.exports.getProductDetails = async(req,res)=>{
    try{
      let {productId} = req.params;
      let product = await Product.findById(productId);
      // console.log(product);
      res.json(product);
    }
    catch(e){
      res.status(500).json(e.message);
    }
}