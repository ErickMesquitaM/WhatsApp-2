const express = require('express')
const router = express.Router()

const controllerSign = require("../controllers/controllerSign")

router.get("/", express.json(), controllerSign) // sign == criar conta

module.exports = router