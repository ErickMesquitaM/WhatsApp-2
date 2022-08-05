require("dotenv").config()

const express = require('express')
const mongoose = require("mongoose")
const path = require("path")
const cookieParser = require('cookie-parser');

const routers = require("./router/router")
const socket = require("socket.io")

const app = express()

app.use(cookieParser());
app.use(express.static('public/assets'))
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/img'))

app.set('views', path.join(__dirname, 'public/views'))
app.set('view engine', 'ejs')

mongoose.connect(process.env.MONGODB_PATH,
    { useNewUrlParser: true, useUnifiedTopology: true},
    (error) => { if(error) throw error; console.log("Mongo Funcionando")
})

app.use("/", express.json(), routers)

const server = app.listen(process.env.PORT, () => {
    console.log("Server Servindo")
})

const io = socket(server)

io.on('connection', (socket) => {

    socket.on('message', (msg) => {
        console.log( msg )
        io.emit('message', msg);
    });

})