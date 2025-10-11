const users = require("../models/user")

// register
exports.registerController = async (req, res) => {
    console.log("Inside register API");
    //console.log(req.body);
    const { username, email, password } = req.body
    console.log(username, email, password);
    
    try {
        const existingUser = await users.findOne({email})
        if(existingUser){
            res.status(409).json("User already exist !! please login")
        }else{
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


// profile