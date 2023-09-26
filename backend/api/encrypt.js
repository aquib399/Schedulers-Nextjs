const bcrypt = require("bcrypt");

exports.hashPass = async function hashPass(password) {
  return new Promise((res, rej) => {
    bcrypt.genSalt(4, function (err, Salt) {
      try {
        bcrypt.hash(password, Salt, function (err, hash) {
          if (err) res(false);
          res(hash);
        });
      } catch (err) {
        res(false);
      }
    });
  });
};
exports.checkHash = async function checkHash(password, hash) {
  return new Promise((res, rej) => {
    try {
      bcrypt.compare(password, hash, (err, isMatch) => {
        if (isMatch) res(true);
        else res(false);
      });
    } catch (err) {
      res(false);
    }
  });
};
