const mongoose = require("mongoose");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
    unique: true,
    },
    password:{
        type: String,
        required:true,

    },
});
const User = mongoose.model("User", userSchema, "user");
module.exports = User;
