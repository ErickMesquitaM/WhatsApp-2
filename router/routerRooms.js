const express = require('express')
const router = express.Router()

const controllerRooms = require("../controllers/controllerRooms")

router.get("/", express.json(), controllerRooms)

module.exports = router