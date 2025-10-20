const express = require('express')
const userController = require('../controllers/userControllers')
const bookController = require("../controllers/bookController")
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerConfig = require('../middlewares/imageMulter')
const router = express.Router()

// register
router.post('/register', userController.registerController)

// login
router.post('/login', userController.loginController)

// Googlelogin
router.post('/google-login', userController.googleLoginController)

// add book
router.post("/add-book", multerConfig.array("uploadImg", 3), jwtMiddleware, bookController.addBookController)

// home-book
router.get("/home-books", bookController.getHomeBooks)

// all books
router.get("/all-books", jwtMiddleware, bookController.getAllBooks)

// view books
router.get("/books/:id/view", jwtMiddleware, bookController.viewBookController)

module.exports = router