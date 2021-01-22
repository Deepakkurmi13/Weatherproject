const mongoose = require("mongoose");


mongoose.connect(process.env.DATA_PATH, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(() => {
    console.log("connect to mongodb");
}).catch((e) => {
    console.log("Not connect");
})