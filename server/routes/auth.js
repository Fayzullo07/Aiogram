const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Heloo")
});

router.post("/signup", (req, res) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        res.status(422).json({error: "Please add all the fields"});
    }
    res.json({msg: "successfully send"})
})

module.exports = router;