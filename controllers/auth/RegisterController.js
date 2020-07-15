
const User = require("../../models/User")
const joi = require("joi")
const bcryt = require("bcryptjs")
const Profile = require("../../models/Profile")

// validation schema for registration
const registrationSchema = joi.object().keys({
    username: joi.string().trim().required(),
    password: joi.string().trim().min(8).required()
})

// Method for registering a user
const store =  async (req, res) => {
    // validate the request
    const {error} = joi.validate(req.body, registrationSchema)

    if (error) return res.status(400).send(error.details[0].message)

    // check if username already exists
    const usernameExists = await User.findOne({username: req.body.username})

    if (usernameExists) return res.status(400).send("Username already exists")

    // hash password
    const salt = await bcryt.genSalt(10)
    const hashedPassword = await bcryt.hash(req.body.password, salt)

    // pass the request into the model
    const user = User({
        username: req.body.username,
        password: hashedPassword
    })

    // save user in the datadase

    try {
        const savedUser = await user.save()
        res.send(savedUser)

        // create a profile for the user
        const profile = Profile({
            firstName: "",
            lastName: "",
            email: "",
            occupation: "",
            location: "",
            profilePicture: "",
            username: savedUser.username,
            user: savedUser._id
        })

        await profile.save()
    }
    catch (error) {
        res.status(400).send({message: error})
    }


}

module.exports.store = store