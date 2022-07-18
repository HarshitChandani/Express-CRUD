const { check, validationResult } = require("express-validator");
const Connection = require("../services/connection");

const con = new Connection().getConnection();

/**
 * Request Type: GET
 * Summary: Page will redirect to new.ejs UI.
 * @param {*} request
 * @param {*} response
 */
exports.redirect_to_add_new_product = (request, response) => {
  response.render("new", {
    data: "",
    error: "",
  });
};

/**
 * Request Type: POST,
 * Summary: Process to add new product.
 * @param {*} request
 * @param {*} response
 */
exports.add_new_product = (request, response) => {
  let error_msg = Array();

  var product = {
    name: request.body["product-name"],
    price: request.body["product-price"],
  };
  con.query("INSERT INTO products SET ?", product, (err, result) => {
    if (!err) {
      response.redirect("/");
    }
  });
};

/**
 * Request Type: GET,
 * Summary: Page will redirect to edit product page.
 * @param {*} request
 * @param {*} response
 */
exports.redirect_to_edit_product = (request, response) => {
  console.log(request.query);
  con.query(
    "SELECT name,price FROM products WHERE id= ?",
    [request.query.q],
    (error, rows) => {
      console.log(rows);
      response.render("edit", { id: request.query.q, data: rows[0] });
    }
  );
};

/**
 * Request Type: POST,
 * Summary: Edit product detail process.
 * @param {*} request
 * @param {*} response
 */
exports.edit_product = (request, response) => {
  var data = {
    name: request.body["product-name"],
    price: request.body["product-price"],
  };
  con.query(
    `update products set ? where id = ${request.body.product_id}`,
    data,
    (err, result) => {
      if (!err) {
        response.redirect("/");
      }
    }
  );
};

/**
 * Request Type: GET,
 * Summary: Delete product process.
 * @param {*} request
 * @param {*} response
 */
exports.delete = (request, response) => {
  con.query(
    `DELETE FROM products WHERE id = ?`,
    [request.query.q],
    (err, result) => {
      if (result.affectedRows == 1) {
        response.redirect("/");
      } else {
        console.log(err);
      }
    }
  );
};

/**
 * Request Type: GET
 * Summary: Get the data of all the products.
 * @param {*} request
 * @param {*} response
 */
exports.get_all_products = (request, response) => {
  con.query("SELECT * FROM products", (err, result) => {
    if (!err) {
      response.render("index", {
        data: result,
      });
    }
  });
};
