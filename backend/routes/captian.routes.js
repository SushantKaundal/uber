const express = require("express");
const { CaptianMiddleware, AuthMiddleware } = require("../middlewares");
const { CaptianController } = require("../controllers");
const router = express.Router();



router.post("/register", CaptianMiddleware.validatecaptianRegister,CaptianController.RegisterCaptian);
router.post("/login", CaptianMiddleware.ValidateCaptianLogin,CaptianController.LoginCaptian);
router.post("/profile", AuthMiddleware.ValidateCaptian, CaptianController.GetCaptianProfile);
router.post("/logout", AuthMiddleware.ValidateCaptian, CaptianController.LogoutCaptian);

module.exports = router;