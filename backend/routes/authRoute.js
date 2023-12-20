const router = require("express").Router();
const auth = require("../controller/authController");

router.post("/signIn", signInValidator, auth.signIn);
router.post("/signUp", signUpValidator, auth.signUp);
router.post("/verifyOtp", verifyOtpValidator, auth.verifyOtp);

function signInValidator(req, res, next) {
  const { username, password } = req.body;

  try {
    if (!username) throw "Username is required";

    if (!password) throw "Password is required";

    if (password.toString().length < 8) throw "Password should be at least 8 characters long";

    next();
  } catch (message) {
    return res.status(400).json({ error: true, message });
  }
}

function signUpValidator(req, res, next) {
  const { username, password, fName, lName, email } = req.body;
  try {
    if (!username) throw "Username is required";

    if (!password) throw "Password is required";

    if (!fName) throw "First Name is required";

    if (!lName) throw "Last Name is required";

    if (!email) throw "Email is required";

    if (password.length < 8) throw "Password should be at least 8 characters long";

    if (email.length < 6 || !email.includes("@") || !email.includes(".")) throw "Invalid email";

    next();
  } catch (message) {
    return res.status(400).json({ error: true, message });
  }
}

function verifyOtpValidator(req, res, next) {
  const { email, otp } = req.body;
  try {
    if (!email) throw "Email is required";

    if (!otp) throw "OTP is required";

    if (email.length < 6 || !email.includes("@") || !email.includes(".")) throw "Invalid email";

    if (otp.toString().length < 5) throw "Invalid OTP";

    next();
  } catch (message) {
    console.log("Error->", message);
    return res.status(400).json({ error: true, message });
  }
}

router.get("/test", auth.test);
module.exports = router;
