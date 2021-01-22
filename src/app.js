require('dotenv').config();
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
require("./db/conn");
const body_parser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const alert = require("alert");
const port = process.env.PORT || 3000;
const { json } = require("express");


//path of folders
const static_path = path.join(__dirname, "../public");
const tamplate_path = path.join(__dirname, "../tamplate/views");
const partials_path = path.join(__dirname, "../tamplate/partials");

app.use(express.static(static_path));
const resister = require("./models/resister");


app.set('view engine', 'hbs');
app.set('views', tamplate_path);
hbs.registerPartials(partials_path);


//json include for save data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//console.log(process.env.KEY_SECURE);


//routing  
app.get("", (req, res) => {
    res.render('index');
});


app.get("/about", (req, res) => {
    res.render('about');
});

app.get("/weather", (req, res) => {
    res.render('weather');
});



app.post("/userresister", async(req, res) => {
    try {

        const password = req.body.password;
        const cpassword = req.body.cpassword;

        if (password == cpassword) {

            const studentdata = new resister({

                firstname: req.body.fname,
                lastname: req.body.lname,
                email: req.body.email,
                gender: req.body.gender,
                phoneno: req.body.phoneno,
                age: req.body.age,
                password: password,
                conforpassword: cpassword
            })

            const token1 = await studentdata.createtoken();
            console.log("this is a token" + token1);


            const graph = await studentdata.save();


            res.status(201).render("login");

        } else {
            res.send("password are not matching");
        }

    } catch (error) {
        res.status(400).render("something went wrong" + error);
    }
});

app.get("/user", (req, res) => {
    res.render('user');
});





app.post("/userlogin", async(req, res) => {
    try {

        const email = req.body.email;
        const password = req.body.password;

        const useremail = await resister.findOne({ email: email });

        const datamatch = bcrypt.compare(password, useremail.password);

        const token1 = await useremail.createtoken();
        console.log("this is a token" + token1);

        if (datamatch) {
            res.status(201).render('user');

        } else {
            res.send("invalid login details");
        }
    } catch (error) {
        res.status(400).send("invalid login details");

    }

});




/*
const securePassword = async(password1) => {

    const passwordsecure = await bcrypt.hash(password1, 10);

    console.log(passwordsecure);

    const passwordsecure1 = await bcrypt.compare(password1, passwordsecure);

    console.log(passwordsecure1);
}


securePassword("deepak@123");



const jwt = require("jsonwebtoken");

const tokenCreate = async() => {

    const token = await jwt.sign({ _id: "6007f665a368eb1bdc2577e8" }, "dddkndnndndy383y83ddbdjbdjbdbdb");
    console.log(token);

    const verify = jwt.verify(token, "dddkndnndndy383y83ddbdjbdjbdbdb");
    console.log(verify);

}
*/


app.get("/resister", (req, res) => {
    res.render('resister');
});


app.get("/login", (req, res) => {
    res.render('login');
});

app.get("/userlogin", (req, res) => {
    res.render('userlogin');
});


app.get("/userresister", (req, res) => {
    res.render('userresister');
});


app.get("*", (req, res) => {
    res.render('404error');
});


app.listen(port, () => {
    console.log("connection successfull.");
});