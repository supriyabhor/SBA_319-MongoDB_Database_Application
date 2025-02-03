// DEPENDENCIES!
//const { name } = require('ejs');

const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: String,
    email: String,
    address: String,
    phone : Number,
   
});

const customer = mongoose.model("customer", customerSchema) // create our model!
module.exports = customer;