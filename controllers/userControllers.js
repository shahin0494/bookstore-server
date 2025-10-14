const users = require("../models/userModel")
const jwt = require("jsonwebtoken")

// register
exports.registerController = async (req, res) => {
    console.log("Inside register API");
    //console.log(req.body);
    const { username, email, password } = req.body
    console.log(username, email, password);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            res.status(409).json("User already exist !! please login")
        } else {
            const newUser = new users({
                username,
                email,
                password
            })
            await newUser.save()
            res.status(200).json(newUser)
        }

    } catch (error) {
        res.status(500).json(err)
    }
}

// login

exports.loginController = async (req, res) => {
    console.log("Inside login API");
    //console.log(req.body);
    const { email, password } = req.body
    console.log(email, password);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            if (existingUser.password == password) {
                const token = jwt.sign({userEmail:existingUser.email},process.env.JWTSECRET)
                res.status(200).json({ user:existingUser , token })
            } else {
                res.status(401).json("invalid email / password")
            }
        } else {
            res.status(404).json("Invalid Credentials")
        }

    } catch (error) {
        res.status(500).json(err)
    }
}

// profile