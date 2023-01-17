'use strict';

const path = require("path");
const express = require("express");
const body_parser = require('body-parser'); 
const cookieParser = require('cookie-parser');
const product_route = require("./routes/product_routes")
const user_route = require("./routes/user_routes")
const app = express();
const {auth} = require("./middlewares/auth")

const PORT = process.env.PORT || 3000;

// Setting up the view directory.
app.set("views",path.join(__dirname,"views"))

// Setting up the templating view engine.
app.set('view engine','ejs')

// support for the urlencoded form post data
app.use(body_parser.urlencoded({extended:true}))

app.use(cookieParser());

// custom middleware for authentication .
app.use(auth);

console.log("Hello");

// setting up the routes
app.use("/",product_route)
app.use("/user",user_route)

app.listen(PORT,() => {
   console.log("Server is listening !")
})
