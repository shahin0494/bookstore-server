const applications = require("../models/applicationModel")

// add application
exports.addApplicationController = async (req, res) => {
    console.log("inside add application controller");
    const { fullname, qualification, email, phone, coverLetter, jobTitle, JobId } = req.body
    const resume = req.file.filename
    try {
        const applicationDetails = await applications.findOne({ email, JobId })
        if (applicationDetails) {
            res.status(409).json("you already applied for the job")
        } else {
            const newApplication = new applications({
                fullname, qualification, email, phone, coverLetter, resume, jobTitle, JobId
            })
            await newApplication.save()
            res.status(200).json(newApplication)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

// get application
exports.getApplicationController = async (req, res) => {
    console.log("inside get application controller");
    try {
        const allApplication = await applications.find()
        res.status(200).json(allApplication)
    } catch (err) {
        res.status(500).json(err)
    }
}