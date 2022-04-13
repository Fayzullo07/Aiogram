const {Schema, model} = require("mongoose");

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    photo: {
        type: String,
        default: "https://res.cloudinary.com/du5hfz4yk/image/upload/v1649849712/3f9470b34a8e3f526dbdb022f9f19cf7_uis4gs.jpg"
    },
    followers: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    following: [
        {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    ]
});

model("User", userSchema);