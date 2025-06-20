const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    title : {
        type : String,
        required : true,
    },
    description : {
        type : String,
        required : true,
    },
    category : {
        type : String,
        required : true,
    },
    price : {
        type : Number,
        required : true,
    }, 
    discountPercentage : {
        type : Number,
        required : true,
    },
    rating : {
        type : Number,
        required : true,
    },
    stock : {
        type : Number,
        required : true,
    },
    brand : {
        type : String,
    },
    minimumOrderQuantity : {
        type : Number,
    },
    availabilityStatus : {
        type : String,
    },
    images :[
        {
            type : String,
            required : true,
        },
    ],
});

const Product = mongoose.model("Product",productSchema);
module.exports = Product;