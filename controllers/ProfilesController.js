const joi = require("joi")
const Profile = require("../models/Profile")
const User = require("../models/User")

// Create Schema for validating request
const ProfileSchema = joi.object().keys({
    firstName: joi.string().trim(),
    lastName: joi.string().trim(),
    email: joi.string().trim().email(),
    occupation: joi.string().trim(),
    location: joi.string().trim(),
    username: joi.string().trim().required(),
    userId: joi.string().trim().required()
})

// Method for storing profiles

const store = async(req, res) => {
    // validate request
    const {error} = joi.validate(req.body, ProfileSchema)

    if(error) return res.status(400).send(error.message)

    // Get the user that owns the profile
    const user = await User.findById({_id: req.body.userId})
    const image = req.file ? req.file.path : ""

    try {
        const postProfile = await Profile.updateOne(
            {username: req.body.username}, 
            {$set: 
                {
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                occupation: req.body.occupation,
                location: req.body.location,
                profilePicture: image,
                username: req.body.username,
                user: user._id
                }
            }
        )
        res.send(postProfile)

    }
    catch(error) {
        res.send({message: error})
        console.log(error)
    }
}

// Method for getting profiles
const index = async(req, res) => {
    try {
        const getProfiles = await Profile.find().populate("user")
        res.send(getProfiles)
    }
    catch(err) {
        res.status(400).send(err)
    }
}
module.exports.store = store
module.exports.index = index