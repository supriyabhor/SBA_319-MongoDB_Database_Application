const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price : Number,
    category: String,
    stock_quantity: Number,
    
});

const product = mongoose.model("product", productSchema) // create our model!
module.exports = product;