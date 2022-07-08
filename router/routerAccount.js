const express = require('express')
const router = express.Router()

const controllerAccount = require("../controllers/controllerAccount")

router.get("/", express.json(), controllerAccount)

module.exports = router