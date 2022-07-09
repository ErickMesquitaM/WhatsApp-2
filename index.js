require("dotenv").config();

const express = require('express')
const mongoose = require("mongoose")
const path = require("path")

const app = express()

app.set("views", path.join(__dirname, "assets/public"))
app.set("view engine", "ejs")

const routerLogin = require("./router/routerLogin")
const routerSign = require("./router/routerSign")
const routerAccount = require("./router/routerAccount")
const routerRooms = require("./router/routerRooms")

mongoose.connect(process.env.MONGODB_PATH,
    { useNewUrlParser: true, useUnifiedTopology: true},
    (error) => { if(error) throw error; console.log("Mongo Funcionando")
})

app.use("/login", express.json(), routerLogin)
app.use("/sign", express.json(), routerSign)
app.use("/account", express.json(), routerAccount)
app.use("/rooms", express.json(), routerRooms)


app.listen(process.env.PORT, () => {
    console.log("Server Servindo")
})
