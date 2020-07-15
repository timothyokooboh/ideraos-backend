const mongoose = require("mongoose")

const userSchema = mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
            min: 8
        }, 
    },

    {timestamps: true}

)

// Whenever a user is deleted, delete his profile

userSchema.pre("deleteOne", function(next) {
    const userId = this.getQuery()["_id"];
    mongoose.model("Profile").deleteOne({"user": userId}, function(err, result) {
        if(err) {
            console.log(err)
            next(err)
        } else {
            console.log("success")
            next()
        }
    })
   
})


module.exports = mongoose.model("User", userSchema)