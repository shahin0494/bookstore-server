// register
exports.registerController = (req, res) => 
    {
    console.log("Inside register API");
    //console.log(req.body);
    const { username, email, password } = req.body
    console.log(username, email, password);
    res.status(200).send("reg req recieved")
    }

// login
// profile