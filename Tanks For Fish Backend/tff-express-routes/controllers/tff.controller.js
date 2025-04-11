"use strict";
const model = require("../models/tff.models");

function getAll(req, res, next) {
  try {
    let productList = model.getAll();
    res.render("products", { productList: productList, title: "All Products" });
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}

function getAllByOneAttribute(req, res, next) {
  let attribute = req.query.attribute;
  let value = req.query.value;
  if (attribute && value) {
    try {
      let productList = model.getAllByOneAttribute(attribute, value); 
      res.render("products", { productList: productList, title: value+"Products" });
    } catch (err) {
      console.error("Error while getting products: ", err.message);
      next(err);
    }
  }
  else {
    res.status(400).send("Invalid Request");
  }
}

function getProductById(req, res, next) {
  try {
    let product = model.getProductById(req.params.product_id);
    res.render("product-details", { product: product, title: product.name });
  } catch (err) {
    console.error("Error while getting products: ", err.message);
    next(err);
  }
}





module.exports = {
  getAll,
  getAllByOneAttribute,
  getProductById
};