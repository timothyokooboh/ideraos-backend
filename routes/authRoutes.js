const router = require("express").Router()
const {store} = require("../controllers/auth/RegisterController")
const {loginUser} = require("../controllers/auth/LoginController")

// API endpoint for user registration
router.post("/register/store", store)

// API endpoint for user login
router.post("/login/loginUser", loginUser)

module.exports = router
