const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const studentSchema = new mongoose.Schema({
    firstname: {
        type: String,
        require: true
    },
    lastname: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    gender: {
        type: String,
        require: true
    },
    phoneno: {
        type: String,
        require: true,
        unique: true
    },
    age: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    conforpassword: {
        type: String,
        require: true
    },
    tokens: [{
        token: {
            type: String,
            require: true
        }
    }]

})


//generate token 
studentSchema.methods.createtoken = async function() {
    try {

        const token2 = jwt.sign({ _id: this._id.toString() }, process.env.KEY_SECURE);
        console.log(token2);
        this.tokens = this.tokens.concat({ token: token2 })
        console.log(this.tokens);
        const data = await this.save();
        return token2;

    } catch (error) {

        res.status(400).send("the error part" + error);
    }
}

//password hashing 
studentSchema.pre("save", async function(next) {

    if (this.isModified("password")) {

        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
})



//now we neet to create collection

const data = new mongoose.model("resister", studentSchema);

module.exports = data;