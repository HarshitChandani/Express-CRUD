const connection = require("../services/connection");
const { createPasswordHash, generate_authToken } = require("../services/util");

const conn = new connection().getConnection();


/**
 * Request Type: GET,
 * Summary: page will redirect to signup.ejs UI.
 * @param {*} request 
 * @param {*} response 
 */
exports.redirect_to_register = (request, response) => {
  response.render("/signup");
};

/**
 * Request Type: POST
 * Summary: User Registration Process
 * @param {*} request
 * @param {*} response
 */
exports.register = (request, response) => {
  const hashed_password = createPasswordHash(request.body.password);

  conn.query(
    "SELECT id FROM users where username = ?",
    [request.body.email],
    (err, result) => {
      if (result.length != 0) {
        console.log("user already registered");
        response.redirect("/user/login");
      } else {
        var product = {
          first_name: request.body.first_name,
          last_name: request.body.last_name,
          username: request.body.email,
          password: hashed_password,
        };
        conn.query("INSERT INTO users SET ? ", product, (err, result) => {
          if (!err) {
            const authToken = generate_authToken();
            response.cookie("authentication", {
              token: authToken,
              [authToken]: [
                {
                  id: result.insertId,
                  first_name: product.first_name,
                  last_name: product.last_name,
                  username: product.username,
                },
              ],
            });
            response.redirect("/");
          }
        });
      }
    }
  );
};

/**
 * Request Type: GET, 
 * Summary: page will redirect to login.ejs page.
 * @param {*} request 
 * @param {*} response 
 */
exports.redirect_to_login = (request, response) => {
   response.render("login");
};

/**
 * Request Type: POST,
 * Summary: Login Process.
 * @param {*} request
 * @param {*} response
 */
exports.login = (request, response) => {
  const { email, password } = request.body;
  const hashed_password = createPasswordHash(password);

  conn.query(
    "SELECT id,first_name,last_name FROM users WHERE username = ? and password = ?",
    [email, hashed_password],
    (error, result) => {
      if (result.length != 0) {
        result["username"] = email;
        const authToken = generate_authToken();
        response.cookie("authentication", {
          token: authToken,
          [authToken]: result,
        });
        response.redirect("/");
      } else {
        console.log("Invalid user !");
        response.redirect("/user/login");
      }
    }
  );
};

/**
 * Request Type: GET,
 * Summary: LogOut Process.
 * @param {*} request
 * @param {*} response
 */
exports.logout = (request, response) => {
  if (request.user != null) {
    response.clearCookie("authentication");
    response.redirect("/");
  }
};
