'use strict';

const crypto = require('crypto');

var createPasswordHash = (value) => {
   const algo = crypto.createHash("sha256")
   const hashed_password = algo.update(value).digest('base64')
   return hashed_password;
}

var generate_authToken = () => {
   return crypto.randomBytes(30).toString('hex')
}


module.exports = { createPasswordHash,generate_authToken }