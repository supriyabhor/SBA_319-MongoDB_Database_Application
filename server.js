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

//PATCH
app.patch("/customers/:id", async (req, res) => {
    try {
        console.log("Received data:", req.body); // Log the incoming request data
         // Update the customer by its _id (which is passed in the URL) and the fields passed in the body
        const updatedCustomer = await customer.findByIdAndUpdate(
            req.params.id,  // Find by the customer ID from the URL
            req.body,  // Fields to update
            { new: true, runValidators: true } // return the updated document and validate
        );

           // If no customer was found, return a 404
        if (!updatedCustomer) {
            return res.status(404).send("Customer not found");
        }
           // Return the updated customer
        res.status(200).send(updatedCustomer);
    } catch (error) {
        res.status(400).send("Error updating customer: " + error.message);
    }
});

//// DELETE route to remove a customer by ID
app.delete("/customers/:id", async (req, res) => {
    try {
        console.log("Received data:", req.body); // Log the incoming request data
        const deletedCustomer = await customer.findByIdAndDelete(req.params.id);
        if (!deletedCustomer) {
            return res.status(404).send("Customer not found");
        }
        res.status(200).send({ message: "Customer deleted successfully", deletedCustomer });
    } catch (error) {
        res.status(500).send("Error deleting customer: " + error.message);
    }
});








const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log("Server Listening On Port: ", PORT);
});