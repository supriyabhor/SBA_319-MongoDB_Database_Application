// DEPENDENCIES!


const mongoose = require('mongoose');

// const customerSchema = new mongoose.Schema({
//     name: String,
//     email: String,
//     address: String,
//     phone : Number
   
// });

const customerSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'Name is required'] // Ensures 'name' is required
    },
    email: { 
        type: String, 
        required: [true, 'Email is required'], // Ensures 'email' is required
        validate: {
            validator: function(v) {
                return /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(v); // Basic email regex
            },
            message: props => `${props.value} is not a valid email!` // Custom error message for invalid email
        }
    },
    address: { 
        type: String, 
        required: [true, 'Address is required'] // Ensures 'address' is required
    },
    phone: { 
        type: Number, 
        required: [true, 'Phone number is required'], // Ensures 'phone' is required
        validate: {
            validator: function(v) {
                return /^[0-9]{10}$/.test(v); // Basic phone number regex (10 digits)
            },
            message: props => `${props.value} is not a valid phone number!` // Custom error message for invalid phone number
        }
    }
});

const customer = mongoose.model("customer", customerSchema) // create our model!
module.exports = customer;


