const express =require("express");
const app = express();
app.use(express.json());
const mongoose = require('mongoose'); // require mongoose package
const customer = require("./models/customer");
require('dotenv').config();

const store = require("./models/customer.js");


mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on("connected", () => {
    console.log(`Connected to MongoDB ${mongoose.connection.name}!`)
});

app.use(express.urlencoded({ extended: false }));
//console.log("connected to db");

app.get("/", async (req, res) => {
    res.send("welcome")
});

//GET
app.get("/customers", async (req, res) => {
    const allCustomer = await customer.find();
     console.log(allCustomer);
    res.send(allCustomer);
});

//POST
app.post("/customers", async (req, res) => {
    try {
        console.log("Received data:", req.body); // Log the incoming request data

        const newCustomer = new customer({
            name: req.body.name,
            email: req.body.email,
            address: req.body.address,
            phone: req.body.phone,
        });

        await newCustomer.save();

        console.log("New customer created:", newCustomer); // Log the created customer
        res.status(201).send(newCustomer); // Send the created customer back
    } catch (error) {
        console.error("Error creating customer:", error.message); // Log error
        res.status(400).send("Error creating customer: " + error.message);
    }
});

//









const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server Listening On Port: ", PORT);
});