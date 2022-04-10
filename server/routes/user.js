const {Router} = require('express');
const router = Router();
const mongoose = require("mongoose");
const login = require("../middleware/login");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/user/:id", login, (req, res) => {
    User.findOne({_id: req.params.id}).then((user) => {
        Post.find({postedBy: req.params.id}).populate("postedBy", "_id, name").exec((err, posts) => {
            if (err) {
                return res.status(422).json({error: err});
            }
            res.json({user, posts});
        })
    }).catch((err) => {
        return res.status(404).json({error: "User Not Found"});
    })
})

module.exports = router;