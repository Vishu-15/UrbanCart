require('dotenv').config()
const express=require("express");
const app = express();
const mongoose = require("mongoose");
const Product = require("./models/product");
const axios = require("axios");
const productsData = require("./data");


const dbUrl = process.env.MONGO_URL;
main()
.then(()=>{console.log("database initialized")})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect(dbUrl);
}

// app.get("/copyData",async(req,res)=>{
//     let dummyProducts = await axios.get("https://dummyjson.com/products");
//     let allProducts = await Product.insertMany(dummyProducts.data.products);
//     console.log(allProducts);
//     res.send(allProducts);
// });

app.get("/copyData", async (req, res) => {
  try
  {
    let dummyProducts = await axios.get("https://dummyjson.com/products/category/womens-watches");
    const existingTitles = await Product.find().distinct("title");
    const newProducts = dummyProducts.data.products.filter(
        (product) => !existingTitles.includes(product.title)
    );
    if (newProducts.length === 0) 
    {
      return res.status(200).send({ message: "No new products to add" });
    }

    let allProducts = await Product.insertMany(newProducts);
    console.log(allProducts);
    res.status(200).send(allProducts);
  } 
  catch (error) 
  {
    console.error(error);
    res.status(500).send({ message: "Failed to copy data", error });
  }
});

app.get("/addProducts",async(req,res)=>{
  Product.insertMany(productsData).then(console.log("all products added")).catch((e)=>{console.log(e)});
  res.send(productsData);
});


const PORT=3000;
app.listen(PORT,()=>{
    console.log("app is listening at port",PORT);
});