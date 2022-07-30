const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const myAccount = require("../controllers/config")
const initial = require("../controllers/initial")
const login = require("../controllers/login/login")
const rooms = require("../controllers/rooms")
const logout = require("../controllers/login/logout")
const sign = require("../controllers/login/sign")
const recoverAccount = require("../controllers/login/recoverAccount")
const recoveryAccountValidate = require("../controllers/login/recoveryAccountValidate")
const newPassword = require("../controllers/login/newPassword")
const newRoom = require("../controllers/newRoom.js")



router.get("/login", express.json(), login.view)
router.post("/login", express.urlencoded({extended: true}), login.login)

router.get("/sign", express.json(), sign.router)
router.post("/sign", express.urlencoded({extended: true}), sign.sign)

router.get("/logout", express.json(), logout )

router.get("/my-account", express.json(), myAccount.myAccount)
router.post("/my-account",  upload.single('inputImg'), myAccount.updateAccount)

router.get("/recover-account", express.json(), recoverAccount.view)
router.post("/recover-account", express.urlencoded({extended: true}), recoverAccount.recovery)

router.get("/recover-account-code", express.json(), recoveryAccountValidate.view)
router.post("/recover-account-code", express.urlencoded({extended: true}), recoveryAccountValidate.validate)

router.get("/new-password", express.json(), newPassword.view)
router.post("/new-password",  upload.single('inputImg'), newPassword.updatePwd)


// router.get("/rooms:?", express.json(), controllerRoom)
router.get("/rooms", express.json(), rooms.view)

router.get("/new-room", express.json(), newRoom.view)
router.post("/new-room", express.urlencoded({extended: true}), newRoom.new)


router.get("/", express.json(), initial)

module.exports = router