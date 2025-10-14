const express = require('express')
const userController = require('../controllers/userControllers')
const router = express.Router()

// register
router.post('/register', userController.registerController )

// login
router.post('/login', userController.loginController )

module.exports = router

