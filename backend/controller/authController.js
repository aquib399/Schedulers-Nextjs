const { checkHash, hashPass } = require("../util/encrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");
const { sendMail } = require("../util/nodemailer");
let data = {};

const signIn = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: true, message: "No user found" });

    const success = await checkHash(password, user.password);
    if (!success) return res.status(403).json({ error: true, message: "Wrong password" });

    const token = jwt.sign({ username }, process.env.ACCESS_TOKEN);
    return res.cookie("authToken", token).json({ error: false, message: "Login Success", payload: { token } });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Interval server error" });
  }
};

const signUp = async (req, res) => {
  try {
    const { username, email, password, fName, lName } = req.body;
    if (
      !(password.length >= 8 && username.length >= 3,
      fName.length && lName.length && email.length >= 6 && password.length >= 8)
    )
      return res.status(400).json({ error: true, message: "Invalid Credentials" });

    const list = Object.keys(data);
    if (list.includes(email)) {
      return res.status(400).json({ error: true, message: "OTP already sent" });
    }
    let exist = await User.findOne({ username });
    if (exist) return res.status(400).json({ error: true, message: "Username already exists" });

    exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ error: true, message: "Email already exists" });

    // const otp = await sendMail(email, fName);
    const otp = Math.floor(Math.random() * 899999 + 100000);
    if (!otp) return res.status(400).json({ error: true, message: "Something went wrong, please try again" });

    const time = Date.now();
    data[email] = { otp, time, username, password, fName, lName };
    console.log("Data sent --------- ", data[email]);

    setTimeout(() => {
      delete data[email];
    }, 900000);

    runTest();
    return res.json({ error: false, message: "Otp sent successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Interval server error" });
  }
};

const verifyOtp = async (req, res) => {
  try {
    let { email, otp } = req.body;

    if (!data[email]) return res.status(400).json({ error: true, message: "Kindly send OTP first" });

    if (data[email].otp != otp) return res.status(403).json({ error: true, message: "Invalid OTP" });

    let { username, password, fName, lName } = data[email];
    password = await hashPass(password);
    await User.create({ username, password, fName, lName, email });
    delete data[email];
    return res.json({ error: false, message: "Account created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Interval server error" });
  }
};

const test = (req, res) => {
  console.log("Testing auth -> /auth/test");
  return res.json({ error: false, message: "Auth Test Success", payload: req.body });
};

module.exports = {
  test,
  signIn,
  signUp,
  verifyOtp,
};
let run = true;
function runTest() {
  const clr =
    run &&
    setInterval(() => {
      run = false;
      if (!Object.keys(data).length) {
        clearInterval(clr);
        run = true;
      }
      console.table(data);
      console.log();
    }, 1500);
}
