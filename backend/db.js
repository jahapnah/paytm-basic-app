const mongoose = require("mongoose");
require("dotenv").config();

const DB_URL = process.env.DATABASE_URL.trim();






mongoose.connect(DB_URL).then(() => {
    console.log("Connected to the database");
}).catch((err) => {
    console.log("Error connecting to the database", err);
});

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 4,
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
    firstName: {
        type: String,
        required: true,
        minLength: 1,
    },
    lastName: {
        type: String,
        required: true,
        minLength: 1,
    }
});

const accountSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
});

const User = mongoose.model('User', userSchema);
const Account = mongoose.model('Account', accountSchema);

module.exports = {
    User,
    Account
};
