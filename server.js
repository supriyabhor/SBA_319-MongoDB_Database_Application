const express =require("express");
const app = express();
app.use(express.json());
const mongoose = require('mongoose'); // require mongoose package
const customer = require("./models/customer");
require('dotenv').config();

const store = require("./models/customer.js");

const store1=require ("./models/product.js")

mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}!`)
});

app.use(express.urlencoded({ extended: false }));
//console.log("connected to db");

app.get("/", async (req, res) => {
    res.send("welcome")
});


app.get("/customers", async (req, res) => {
    const allCustomer = await customer.find();
     console.log(allCustomer);
    res.send(allCustomer);
});





const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server Listening On Port: ", PORT);
});