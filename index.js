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
/*

CONFIGURAÇÃO DA SALA
    fazer funçao de:
        atualizar (para o adm)
        remover um usuario (para o adm)

FAZER OUTRA ROTA PARA AS CONTAS DE OUTROS USERS
    sem nenhuma ação, apenas ver o nome, telefone e a foto
    criar o ejs padrão com:
        imagem, nome, e se tiver numero de telefone vinculado faezr um capo para ele

MENSAGENS
    pegar o nome do usuário e colocar na mensagem
    fazer o filtro com o id pra saber se a mensagem enviada foi pelo usuário logado e colocar uma classe
    salavar o objeto da mensagem no banco de dados vinculado com a sala 

DIMINUIR A IMAGEM AO USAR NO PERFIL OU NO PERFIL DA SALA

LINK DE CONVITE
    se o usuário convidado não estiver logado, mandar para a parte de login com uma mensagem, ex: "Entre com uma conta ou cria uma para poder participar de outras salas"

*/