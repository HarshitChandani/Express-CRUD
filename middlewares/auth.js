'use strict';


const is_authenticated = (request,response) => {
   if (request.user != null){
      next();
    }
    else{
      response.redirect("/user/login")
    }
};

const auth = (request,response,next) => {
   if (request.cookies["authentication"] != undefined) {
      const authentication = request.cookies["authentication"]
      const token = authentication.token
      request.user = authentication[token]
   }
   else{
      request.user = null
   }
   next();
} 

module.exports = {
   auth:auth,
   isAuthenticated:is_authenticated
}