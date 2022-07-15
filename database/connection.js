const mysql = require("mysql");

const DATA = {
  host: "localhost",
  username: "root",
  password: "admin",
  database: "express_crud",
  port: 3306,
  localAddress: "127.0.0.1",
};

class Connection {
  constructor() {
    this.dbConnect = mysql.createConnection({
      host: DATA.host,
      user: DATA.username,
      password: DATA.password,
      database: DATA.database,
    });
  }
  getConnection = () => {
    this.dbConnect.connect((error) => {
      console.log("Connection Created.");
    });
    return this.dbConnect;
  };

}

module.exports = Connection;
