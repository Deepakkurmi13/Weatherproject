const mongoose = require("mongoose");


mongoose.connect("mongodb://localhost:27017/Data", {

    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("connect to mongodb");
}).catch((e) => {
    console.log("Not connect");
})