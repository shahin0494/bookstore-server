const express = require('express')
const userController = require('../controllers/userControllers')
const bookController = require("../controllers/bookController")
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const multerConfig = require('../middlewares/imageMulter')
const adminjwtMiddleware = require('../middlewares/adminJwtMiddleware')
const router = express.Router()

// unauthorised USER

// register
router.post('/register', userController.registerController)

// login
router.post('/login', userController.loginController)

// Googlelogin
router.post('/google-login', userController.googleLoginController)

// home-book
router.get("/home-books", bookController.getHomeBooks)

// authorised USER

// add book
router.post("/add-book", multerConfig.array("uploadImg", 3), jwtMiddleware, bookController.addBookController)

// all books
router.get("/all-books", jwtMiddleware, bookController.getAllBooks)

// view books
router.get("/books/:id/view", jwtMiddleware, bookController.viewBookController)

// get user book
router.get("/user-books",jwtMiddleware,bookController.getAllUserBooksController)

// get user bought book
router.get("/user-bought-books",jwtMiddleware,bookController.getAllUserBoughtBooksController)

// delete user books
router.delete("/user-books/:id/remove",jwtMiddleware,bookController.deleteUserBookController)

// user profile update
router.put("/user-profile/edit",jwtMiddleware,multerConfig.single("profile"),userController.userProfileEditController)

// ---------- admin----------

// get all users
router.get("/all-user",adminjwtMiddleware,userController.getAllUsersController)

// get all books
router.get('/admin-all-books',adminjwtMiddleware,bookController.getAllBookAdminController)

// approve book
router.put('/admin/book/approve',adminjwtMiddleware,bookController.updateBookStatusController)

module.exports = router