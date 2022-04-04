const express = require("express");
const app = express();
const mongoose = require("mongoose");
const {MONGO_URI} = require("./keys/index");
const PORT = 5001;
require("./models/user");
require("./models/post");

app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/post"));


mongoose.connect(MONGO_URI)

app.listen(PORT, () => {
    console.log(`Server has been started ${PORT}`);
})