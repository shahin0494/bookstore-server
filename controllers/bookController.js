const books = require("../models/bookModel")

// add book
exports.addBookController = async (req, res) => {
    console.log("inside 🤣 addbookcontroller");
    res.status(200).json("request recieved")

}