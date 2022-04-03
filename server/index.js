const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {MONGO_URI} = require("./keys/index");
const PORT = process.env.PORT || 5000;



app.get("/", (req, res) => {
    res.send("hello")
})

mongoose.connect(MONGO_URI, () => {
    console.log("MongoDB was connected successfully");
})

app.listen(PORT, console.log(`Server has been started ${PORT}`));