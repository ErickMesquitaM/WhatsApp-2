const express = require('express')
const router = express.Router()

const controllerAccount = require("../controllers/controllerAccount")
const controllerInitial = require("../controllers/controllerInitial")
const controllerLogin = require("../controllers/controllerLogin")
const controllerRooms = require("../controllers/controllerRooms")
const controllerSign = require("../controllers/controllerSign")

router.get("/login", express.json(), controllerLogin)
router.get("/sign", express.json(), controllerSign)
router.get("/account", express.json(), controllerAccount)
router.get("/rooms", express.json(), controllerRooms)
router.get("/", express.json(), controllerInitial)

module.exports = router