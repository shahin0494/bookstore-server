const users = require("../models/userModel")
const jwt = require("jsonwebtoken")


// ------------------- user -------------------------

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
        res.status(500).json(error)
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
                const token = jwt.sign({ userEmail: existingUser.email, role: existingUser.role }, process.env.JWTSECRET)
                res.status(200).json({ user: existingUser, token })
            } else {
                res.status(401).json("invalid email / password")
            }
        } else {
            res.status(404).json("Invalid Credentials")
        }

    } catch (error) {
        res.status(500).json(error)
    }
}
// google login

exports.googleLoginController = async (req, res) => {
    console.log("Inside Google login API");
    //console.log(req.body);
    const { email, password, username, profile } = req.body
    console.log(email, password, username, profile);

    try {
        const existingUser = await users.findOne({ email })
        if (existingUser) {
            // token
            const token = jwt.sign({ userEmail: existingUser.email, role: existingUser.role }, process.env.JWTSECRET)
            res.status(200).json({ user: existingUser, token })
        } else {
            const newUser = new users({
                username, email, password, profile
            })
            await newUser.save()
            // token
            const token = jwt.sign({ userEmail: newUser.email }, process.env.JWTSECRET)
            res.status(200).json({ user: newUser, token })
        }

    } catch (error) {
        res.status(500).json(error)
    }
}

// profile - user
exports.userProfileEditController = async (req, res) => {
    console.log("inside user profile controller");
    // get data to be updated from req,body,payload,file
    const { username, password, bio, role, profile } = req.body
    const email = req.payload
    const uploadProfile = req.file ? req.file.filename : profile
    try {
        const updateUser = await users.findOneAndUpdate({ email }, { username, email, password, profile: uploadProfile, bio, role }, { new: true })
        await updateUser.save()
        res.status(200).json(updateUser)
    } catch (err) {
        res.status(500).json(err)
    }
}


// ------------------- admin -------------------------

// get all users
exports.getAllUsersController = async (req, res) => {
    console.log("inside alluserscontroller");
    const email = req.payload
    try {
        const allUsers = await users.find({ email: { $ne: email } })
        res.status(200).json(allUsers)
    } catch (err) {
        res.status(500).json(err)
    }

}

// updatw admin profile
exports.adminProfileEditController = async (req, res) => {
    console.log("inside admmin profile controller");
    // get data to be updated from req,body,payload,file
    const { username, password, bio, profile } = req.body
    const email = req.payload
    const role = req.role
    const uploadProfile = req.file ? req.file.filename : profile
    try {
        const updateAdmin = await users.findOneAndUpdate({ email }, { username, email, password, profile: uploadProfile, bio, role }, { new: true })
        await updateAdmin.save()
        res.status(200).json(updateAdmin)
    } catch (err) {
        res.status(500).json(err)
    }
}
