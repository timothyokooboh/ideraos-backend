const mongoose = require("mongoose")

const ProfileSchema = mongoose.Schema(
    {
        firstName: {
            type: String,
            required: false
        },
        lastName: {
            type: String,
            required: false
        },
        email: {
            type: String,
            required: false
        },
        occupation: {
            type: String,
            required: false
        },
        location: {
            type: String,
            required: false
        },
        profilePicture: {
            type: String,
            required: false
        },
        username: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {timestamps: true}
)

module.exports = mongoose.model("Profile", ProfileSchema)