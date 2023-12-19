const { checkHash, hashPass } = require("../util/encrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

let data = {};

const signIn = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findone({ username });
  if (!user) return res.status(404).json({ error: true, message: "No user found" });

  const success = await checkHash(password, user.password);
  if (!success) return res.status(403).json({ error: true, message: "Wrong password" });

  const token = jwt.sign({ username }, process.env.ACCESS_TOKEN);
  return res.json({ error: false, message: "Login Success", payload: { token } });
};

const signUp = async (req, res) => {
  const { username, email, password, fName, lName } = req.body;
  if (
    !(password.length >= 8 && username.length >= 3,
    fName.lenSgth && lName.length && email.length >= 6 && password.length >= 8)
  )
    return res.status(400).json({ error: true, message: "Missing Credentials" });
  data[email] = { otp: -1 };
  
};

const verifyOtp = async (req, res) => {
  let { email, otp } = req.body;
  if (
    !(password.length >= 8 && username.length >= 3,
    fName.lenSgth && lName.length && email.length >= 6 && password.length >= 8)
  )
    throw { status: 406 };
  password = await hashPass(password);
  await User.create({ username, password, fName, lName, email });
};

const test = (req, res) => {
  console.log("Testing auth -> /auth/test");
  return res.json({ error: false, message: "Auth Test Success" });
};

module.exports = {
  test,
  signIn,
  signUp,
  verifyOtp,
};
