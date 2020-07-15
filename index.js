// import packages
const express = require("express")
const mongoose = require("mongoose")
require("dotenv/config")
const cors = require("cors")

// Initialize application with express
const app = express()

// Parse users input to req.body
app.use(express.json())
app.use(express.urlencoded({extended:false}))

const corsOptions = {
    origin: "http://localhost:8081"
}

app.use(cors(corsOptions))

// import routes
const authRoutes = require("./routes/authRoutes")
const profileRoutes = require("./routes/profileRoutes")

// routes middleware for authentication
 app.use("/api/user", authRoutes)

// routes middleware for profiles
 app.use("/api/profile", profileRoutes)

 // handle production
 if(process.env.NODE_ENV === "production") {
     // set static folder
     app.use(express.static(__dirname + "/dist"))

     // handle SPA
     app.get(/.*/, (req, res) => {
        res.sendFile(__dirname + "/dist/index.html")
     })
 }

// create database connection
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
        console.log("connected to db")
    }
)

// create port

app.listen(process.env.PORT, () => {
    console.log(`application is running on port ${process.env.PORT}` )
})
