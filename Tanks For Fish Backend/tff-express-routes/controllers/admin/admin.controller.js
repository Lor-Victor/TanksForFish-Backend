"use strict";
const adminModel = require("../../models/admin.model");


function getAllByOneAttribute(req, res, next) {
  let attribute = req.query.attribute;
  let value = req.query.value;
  if (attribute && value) {
    try {
      let productList = adminModel.getAllByOneAttribute(attribute, value); 
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
    let product = adminModel.getProductById(req.params.product_id);
    res.render("product-details", { product: product, title: product.name });
  } catch (err) {
    console.error("Error while getting products: ", err.message);
    next(err);
  }
}
function getAllProducts(req, res, next) {
  try {
    let productList = adminModel.getAll();
    res.render("admin-products", { productList: productList, title: "All Products" });
  } catch (err) {
    console.error("Error while getting products ", err.message);
    next(err);
  }
}

function createNew(req, res, next) {
    let cat_id = req.body.cat_id;
    let Model = req.body.Model;
    let name = req.body.name;
    let description = req.body.description;
    let price = parseFloat(req.body.price);
    let dimensions = req.body.dimensions;
    let material = req.body.material;
    let color = req.body.color;
    let image_url = req.body.image_url;
  
    if (cat_id && Model && name && description && price && dimensions && material && color && image_url) {
      let params = [cat_id, Model, name, description, price, dimensions, material, color, image_url];
      try {
        model.createNew(params);
        res.render("admin-products", { productList: productList, title: "All Products" });
      } catch (err) {
        console.error("Error while creating product: ", err.message);
        next(err);
      }
    } else {
      res.status(400).send("Invalid Request");
    }
  }


// function showEditForm(req, res, next) {
//   const productId = req.params.product_id;
  
//   if (category && Model && name && description && price && dimensions && material && color && image_url) {
//     try {
//       const product = adminModel.getProductById(productId);
//       res.render("admin-update", { productList: product, title: `Edit ${product.name}` });
//     } catch (err) {
//       console.error('Error while updating product:', err.message);
//       next(err);
//     }
//   } else {
//     res.status(400).send('Invalid Request');
//   }
// }
async function showEditForm(req, res, next) {
  const productId = req.params.product_id;
  try {
    const product = adminModel.getProductById(productId); // Get the product directly

    if (!product) {
      return res.status(404).send('Product not found');
    }

    res.render("admin-update", { product: product, title: `Edit ${product.name}` });

  } catch (err) {
    console.error('Error fetching product for edit:', err.message);
    next(err);
  }
}
function deleteProduct(req, res, next) {
    try {
      adminModel.deleteProduct(req.params.id);
      res.render("admin-products",{productList: adminModel.getAll(),title:"All Products"});
    } catch (err) {
      console.error("Error while deleting product: ", err.message);
      next(err);
    }
  }

module.exports = {
  getAllProducts,
  getAllByOneAttribute,
  getProductById,
  createNew,
  showEditForm,
  deleteProduct
};
