const jobs = require("../models/jobModel")

// add job
exports.addJobController = async (req, res) => {
    console.log("inside add job boook controller");
    const { title, location, jobType, salary, qualification, experience, description } = req.body
    console.log(title, location, jobType, salary, qualification, experience, description);

    try {
        const jobDetails = await jobs.findOne({ title, location })
        if (jobDetails) {
            res.status(409).json("job already exists please add another")
        } else {
            const newJob = new jobs({
                title, location, jobType, salary, qualification, experience, description
            })
            await newJob.save()
            res.status(200).json(newJob)
        }
    } catch (err) {
        res.status(500).json(err)
    }
}

// get all job and display it
exports.getAllJobsController = async (req, res) => {
    console.log("get all jobd controller");
    const searchKey = req.query.search
    const query = {
        title: { $regex: searchKey, $options: "i" }
    }
    try {
        const allJobs = await jobs.find(query)
        res.status(200).json(allJobs)
    } catch (err) {
        res.status(500).json(err)
    }
}

// delete job 
exports.removeJobController = async (req, res) => {
    console.log("inside remove job controller");
    const { id } = req.params
    try {
        const deleteJob = await jobs.findByIdAndDelete({ _id: id })
        res.status(200).json(deleteJob)
    } catch (err) {
        res.status(500).json(err)
    }
}