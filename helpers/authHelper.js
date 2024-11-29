const bcrypt = require("bcrypt");
const { decrypt } = require("dotenv");

//HASH FUNCTION

exports.hashpassword = (password) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(10, (err, salt) => {
      if (err) {
        reject(err);
      }
      bcrypt.hash(password, salt, (err, hash) => {
        if (err) {
          reject(err);
        }
        resolve(hash);
      });
    });
  });
};

//COMPARE || DECRYPT FUNCTION

exports.comparePassword = (password, hashed) => {
  return bcrypt.compare(password, hashed);
};
