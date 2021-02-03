const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 3000;
const { json } = require("express");



//path of folders
const static_path = path.join(__dirname, "../public");
const tamplate_path = path.join(__dirname, "../tamplate/views");
const partials_path = path.join(__dirname, "../tamplate/partials");

app.use(express.static(static_path));

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



app.post("/resister", async(req, res) => {
     
    res.status(201).render("login");

});


app.post("/login", async(req, res) => {
   
    res.status(201).redirect('/');

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

app.get("/weather", (req, res) => {
    res.render('weather');
});


app.get("/login", (req, res) => {
    res.render('login');
});

app.get("*", (req, res) => {
    res.render('404error');
});

app.listen(port, () => {
    console.log("connection successfull.");
});

