"use strict";
const express = require("express");
const router = express.Router();

const adminController = require("../controllers/admin/admin.controller");

router.get("/all", adminController.getAllProducts);
router.get("/", adminController.getAllByOneAttribute);
router.get("/product/:product_id", adminController.getProductById);
router.delete("/delete/:id", adminController.deleteProduct);
// router.post("/product/add", adminController.createNew);
router.get("/edit/:product_id", adminController.showEditForm);

module.exports = router;


