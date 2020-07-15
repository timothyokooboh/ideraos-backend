const router = require("express").Router()
// Extract the API methods from the Profiles Controller
const {store, index} = require("../controllers/ProfilesController")

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'ideraOS',
        format: async (req, file) => "png", 
        limits: {
            fileSize: 1000000 // allows only files with max size of 1mb
        },
        transformation: [{ width: 500, height: 500, crop: "limit" }],
        public_id: (req, file) => Date.now(), 
    },
});

const parser = multer({ storage: storage });

//API endpoint for update profile details
router.patch("/create/store", parser.single("image"), store)

//API endpoint for fetching profile details
router.get("/get/index", index)

module.exports = router