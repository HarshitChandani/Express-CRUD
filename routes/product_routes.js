"use strict";

const express = require("express");
const Connection = require("../database/connection");
const app = express();

const con = new Connection().getConnection();

app.get("/", (request, response) => {
  var data;
  con.query("SELECT * FROM products", (err, result) => {
    if (!err) {
      response.render("index", {
        data: result,
      });
    }
  });
});

app.route("/new")
  .get((request, response) => {
    response.render("new");
  })
  .post((request, response) => {
    var product = {
      name: request.body["product-name"],
      price: request.body["product-price"],
    };
    con.query("INSERT INTO products SET ?", product, (err, result) => {
      if (!err) {
        response.redirect("/");
      }
    });
  });

app.route("/edit")
  .get((request, response) => {
    con.query(
      "SELECT name,price FROM products WHERE id= ?",
      [request.query.q],
      (error, rows) => {
        response.render("edit", { id :request.query.q ,data: rows[0] });
      }
    );
  })
  .post((request,response) => {
    var data = {
      name: request.body["product-name"],
      price: request.body["product-price"],
    }
    con.query(`update products set ? where id = ${request.body.product_id}`,data,(err,result) => {
      if (!err){
        response.redirect("/")
      }
    });
  });

app.get("/delete",(request,response) => {
  con.query(`DELETE FROM products WHERE id = ?`,[request.query.q],(err,result) => {
    if (result.affectedRows == 1){
      response.redirect("/")
    }
    else{
      console.log(err)
    }
  })
})

module.exports = app;
