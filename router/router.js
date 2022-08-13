const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const myAccount = require("../controllers/myAccount")
const initial = require("../controllers/initial")
const login = require("../controllers/login/login")
const rooms = require("../controllers/rooms")
const logout = require("../controllers/login/logout")
const sign = require("../controllers/login/sign")
const recoverAccount = require("../controllers/login/recoverAccount")
const recoveryAccountValidate = require("../controllers/login/recoveryAccountValidate")
const newPassword = require("../controllers/login/newPassword")
const newRoom = require("../controllers/newRoom")
const enterRoom = require("../controllers/enterRoom")
const configRoom = require("../controllers/configRoom")
const visitUser = require("../controllers/visitUser")

const auth = require("../controllers/login/auth")

router.get("/login", login.view)
router.post("/login", express.urlencoded({extended: true}), login.login)

router.get("/sign", sign.router)
router.post("/sign", express.urlencoded({extended: true}), sign.sign)

router.get("/logout", auth, logout )

router.get("/my-account", auth, myAccount.myAccount)
router.post("/my-account",  upload.single('inputImg'), myAccount.updateAccount)

router.get("/recover-account", recoverAccount.view)
router.post("/recover-account", express.urlencoded({extended: true}), recoverAccount.recovery)

router.get("/recover-account-code", recoveryAccountValidate.view)
router.post("/recover-account-code", express.urlencoded({extended: true}), recoveryAccountValidate.validate)

router.get("/new-password", newPassword.view)
router.post("/new-password",  express.urlencoded({extended: true}), newPassword.updatePwd)

router.get("/user/:id_user", visitUser)

router.get("/rooms/:id_room/enter", auth, enterRoom.view)
router.post("/rooms/:id_room/enter", express.urlencoded({extended: true}), enterRoom.enter)

router.post("/rooms/:id_room/update", express.urlencoded({extended: true}), enterRoom.enter)

router.get("/rooms/:id_room/config", auth, configRoom.view)
router.post("/rooms/:id_room/config", express.urlencoded({extended: true}), configRoom.update)

router.get("/rooms/:id_room/exit", auth, rooms.exit)

router.get("/rooms/:id_room", auth, rooms.redirectRoom)
router.get("/rooms", auth, rooms.view)

router.get("/new-room", auth, newRoom.view)
router.post("/new-room", upload.single('inputImage'), newRoom.new)


router.get("/", initial)

module.exports = router