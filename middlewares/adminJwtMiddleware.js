const jwt = require("jsonwebtoken")

const adminjwtMiddleware = (req,res,next) => {
    console.log("inside adminjwtMiddleware")
    const token = req.headers.authorization.split(" ")[1]
    console.log(token);
    try {
            const jwtResponse = jwt.verify(token, process.env.JWTSECRET)
            console.log(jwtResponse);
            req.payload = jwtResponse.userEmail
            req.role = jwtResponse.role
            if (jwtResponse.role=="admin") {
                next()
            }else{
                res.status(401).json("unauthorised user")
            }
        } catch (err) {
            res.status(401).json("invalid token", err)
        }
}

module.exports = adminjwtMiddleware