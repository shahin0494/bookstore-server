// import dotenv express cors
require("dotenv").config() //load .env files into process.rnv by default
const express = require("express")
const cors = require("cors")
const router = require("./routing/router") // import route
require('./database/connection')

// create server
const bookstoreServer = express()

//enable cors protocol in server
bookstoreServer.use(cors())
bookstoreServer.use(express.json()) // enable json parsing
bookstoreServer.use(router) //enable router
bookstoreServer.use("/uploads",express.static("./uploads"))

// create port for our application
const PORT = 3000

// run server in port
bookstoreServer.listen(PORT, () => {
    console.log(`Booksteore 🥸 Server 👻 started at port ${PORT} 😭`)
})

//resolving http request
bookstoreServer.get('/', (req, res) => {
    res.status(200).send("<h1>Bookstore  idewiojfioewofwserver started recieved on browser<h1/>")
})

// bookstoreServer.post('/',(req,res)=>{
//     res.status(200).send("POST REQUEST")
// })

