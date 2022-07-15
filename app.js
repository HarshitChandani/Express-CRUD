'use strict';

const path = require("path");
const express = require("express");
const body_parser = require('body-parser');
const product_route = require("./routes/product_routes")
const app = express();

const PORT = process.env.PORT || 3000;

// Setting up the view directory.
app.set("views",path.join(__dirname,"views"))

// Setting up the templating view engine.
app.set('view engine','ejs')

// support for the urlencoded form post data
app.use(body_parser.urlencoded({extended:true}))

// setting up the routes
app.use("/",product_route)

app.listen(PORT,() => {
   console.log("Server is listening !")
})
