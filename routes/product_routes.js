"use strict";

const express = require("express");
const product_controller = require("../controller/productController")
const {isAuthenticated} = require("../middlewares/auth")

const router = express.Router();

router.get("/", isAuthenticated ,product_controller.get_all_products);
router.get("/new", product_controller.redirect_to_add_new_product );
router.post("/new",product_controller.add_new_product);
router.get("/edit",product_controller.redirect_to_edit_product)
router.post("/edit",product_controller.edit_product);
router.get("/delete", product_controller.delete);

module.exports = router;
