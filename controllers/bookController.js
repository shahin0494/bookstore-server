const books = require("../models/bookModel")

// add book
exports.addBookController = async (req, res) => {
    //console.log("inside 🥸 addbookcontroller");
    //console.log(req.body);
    const { title, author, noOfPages, imageUrl, price, discountPrice, abstract, publisher, language, isbn, category } = req.body
    const userMail = req.payload
    var uploadImg = []
    req.files.map(item => uploadImg.push(item.filename))
    console.log(title, author, noOfPages, imageUrl, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, userMail);
    try {
        const existingBook = await books.findOne({ title, userMail })
        if (existingBook) {
            res.status(401).json("you have already added the book")
        } else {
            const newBook = new books({
                title, author, noOfPages, imageUrl, price, discountPrice, abstract, publisher, language, isbn, category, uploadImg, userMail
            })
            await newBook.save()
            res.status(200).json(newBook)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

// get home books
exports.getHomeBooks = async (req, res) => {
    console.log("inside get home books");
    try {
        const allHomeBooks = await books.find().sort({_id:-1}).limit(4)
        res.status(200).json(allHomeBooks)
    } catch (err) {
        res.status(500).json(err)
    }
}