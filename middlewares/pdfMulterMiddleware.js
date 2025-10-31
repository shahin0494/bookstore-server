const multer = require("multer")

// storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './pdf')
    },
    filename: (req, file, cb) => {
        cb(null, `resume-${Date.now()}-${file.originalname}`)
    }
})

// file filter
const fileFilter = (req, file, cb) => {
    if (file.mimetype == "application/pdf") {
        cb(null, true)
    } else {
        cb(null, false)
        return cb(new Error("only accepts PDF 🥸"))
    }
}

// pdf multer config
const pdfMulterConfig = multer({
    storage,
    fileFilter
})

module.exports = pdfMulterConfig