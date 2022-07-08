const express = require('express')
const router = express.Router()

const controllerLogin = require("../controllers/controllerLogin")

router.get("/", express.json(), controllerLogin) // login == entrar com a conta

module.exports = router