const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {MONGO_URI} = require("./keys/index");
const PORT = 5001;
require("./models/user");

app.use(express.json());

app.use(require("./routes/auth"));


mongoose.connect(MONGO_URI)

app.listen(PORT, () => {
    console.log(`Server has been started ${PORT}`);
})