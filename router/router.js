const express = require('express')
const router = express.Router()

const controllerConfig = require("../controllers/controllerConfig")
const controllerInitial = require("../controllers/controllerInitial")
const controllerLogin = require("../controllers/login/controllerLogin")
const controllerRooms = require("../controllers/controllerRooms")
const controllerSign = require("../controllers/login/controllerSign")
const controllerRecoverAccount = require("../controllers/controllerRecoverAccount")


router.get("/login", express.json(), controllerLogin)

router.get("/sign", express.json(), controllerSign.router)
router.post("/sign", express.urlencoded({extended: true}), controllerSign.sign)

router.get("/config", express.json(), controllerConfig)
router.get("/rooms", express.json(), controllerRooms)
router.get("/recover-account", express.json(), controllerRecoverAccount)
router.get("/", express.json(), controllerInitial)

module.exports = router