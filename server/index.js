const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const {MONGO_URI} = require("./keys/index");
const PORT = 5001;
require("./models/user");
require("./models/post");

const corsOptions = {
    origin: "*",
    credential: true,
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
mongoose.connect(MONGO_URI)

app.use(express.json());

app.use(require("./routes/auth"));
app.use(require("./routes/post"));



app.listen(PORT, () => {
    console.log(`Server has been started ${PORT}`);
})