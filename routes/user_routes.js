"use strict";

const express = require("express");
const user_controller = require("../controller/userController")

const router = express.Router();

router.get("/new", user_controller.redirect_to_register);
router.post("/new", user_controller.register);
router.get("/login", user_controller.redirect_to_login);
router.post("/login", user_controller.login);
router.get("/logout", user_controller.logout);

module.exports = router;
