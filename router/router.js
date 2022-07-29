const express = require('express')
const router = express.Router()
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })

const controllerMyAccount = require("../controllers/controllerConfig")
const controllerInitial = require("../controllers/controllerInitial")
const controllerLogin = require("../controllers/login/controllerLogin")
const controllerRooms = require("../controllers/controllerRooms")
const controllerLogout = require("../controllers/login/controllerLogout")
const controllerSign = require("../controllers/login/controllerSign")
const controllerRecoverAccount = require("../controllers/login/controllerRecoverAccount")
const controllerRecoveryAccountValidate = require("../controllers/login/controllerRecoveryAccountValidate")
const controllerNewPassword = require("../controllers/login/controllerNewPassword")



router.get("/login", express.json(), controllerLogin.view)
router.post("/login", express.urlencoded({extended: true}), controllerLogin.login)

router.get("/sign", express.json(), controllerSign.router)
router.post("/sign", express.urlencoded({extended: true}), controllerSign.sign)

router.get("/logout", express.json(), controllerLogout )

router.get("/my-account", express.json(), controllerMyAccount.myAccount)
router.post("/my-account",  upload.single('inputImg'), controllerMyAccount.updateAccount)

router.get("/recover-account", express.json(), controllerRecoverAccount.view)
router.post("/recover-account", express.urlencoded({extended: true}), controllerRecoverAccount.recovery)

router.get("/recover-account-code", express.json(), controllerRecoveryAccountValidate.view)
router.post("/recover-account-code", express.urlencoded({extended: true}), controllerRecoveryAccountValidate.validate)

router.get("/new-password", express.urlencoded({extended: true}), controllerNewPassword.view)
router.post("/new-password", express.urlencoded({extended: true}), controllerNewPassword.updatePwd)

router.get("/rooms", express.json(), controllerRooms)

router.get("/", express.json(), controllerInitial)

module.exports = router