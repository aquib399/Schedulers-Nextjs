const bcrypt = require("bcrypt");

export async function hashPass(password) {
  return new Promise((res, rej) => {
    bcrypt.genSalt(12, function (err, Salt) {
      try {
        bcrypt.hash(password, Salt, function (err, hash) {
          if (err) res(false);
          res(hash);
        });
      } catch (err) {
        console.log(err);
        res(false);
      }
    });
  });
}

export async function checkHash(password, hash) {
  return new Promise((res, rej) => {
    try {
      bcrypt.compare(password, hash, (err, isMatch) => {
        if (isMatch) res(true);
        else res(false);
      });
    } catch (err) {
      console.log(err);
      res(false);
    }
  });
}
