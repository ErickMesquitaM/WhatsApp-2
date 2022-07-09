require("dotenv").config();

const express = require('express')
const mongoose = require("mongoose")
const path = require("path")
const routers = require("./router/router")

const app = express()

app.set("views", path.join(__dirname, "public/pages"))
app.set("view engine", "ejs")


mongoose.connect(process.env.MONGODB_PATH,
    { useNewUrlParser: true, useUnifiedTopology: true},
    (error) => { if(error) throw error; console.log("Mongo Funcionando")
})

app.use("/", express.json(), routers)

app.listen(process.env.PORT, () => {
    console.log("Server Servindo")
})
