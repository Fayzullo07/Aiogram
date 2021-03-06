const {Router} = require('express');
const router = Router();
const mongoose = require("mongoose");
const login = require("../middleware/login");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

router.get("/user/:id", (req, res) => {
    User.findOne({_id: req.params.id}).select("-password").then((user) => {
        Post.find({postedBy: req.params.id}).populate("postedBy", "_id, name").exec((err, posts) => {
            if (err) {
                return res.status(422).json({error: err});
            }
            res.json({user, posts});
        })
    }).catch((err) => {
        return res.status(404).json({error: "User Not Found"});
    })
});

router.put("/follow", login, (req, res) => {
    User.findByIdAndUpdate(req.body.followId, {
        $push: {followers: req.user._id}
    }, { new: true }, (err, result) => {
        if(err) {
            return res.status(422).json({error: err});
        }
        User.findByIdAndUpdate(req.user._id, {
            $push: {following: req.body.followId}
        }, { new: true }).select("-password").then((result) => {
            res.json(result);
        }).catch((err) => {
            return res.status(422).json({error: err});
        })
    });
});

router.put("/unfollow", login, (req, res) => {
    User.findByIdAndUpdate(req.body.unfollow, {
        $pull: {followers: req.user._id}
    }, { new: true }, (err, result) => {
        if(err) {
            res.status(422).json({error: err});
        }
        User.findByIdAndUpdate(req.user._id, {
            $pull: {following: req.body.unfollow}
        }, { new: true }).select("-password").then(result => {
            res.json(result);
        }).catch(err => {
            return res.status(422).json({error: err});
        })
    })
})

router.put("/updatephoto", login, (req, res) => {
    User.findByIdAndUpdate(
      req.user._id,
      { $set: { photo: req.body.photo } },
      { new: true },
      (err, result) => {
        if (err) {
          return res.status(422).json({ err: "Picture can not posted" });
        }
        res.json(result);
      }
    );
  });

module.exports = router;