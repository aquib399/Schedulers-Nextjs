const router = require("express").Router();
const auth = require("../controller/authController");

router.post("/signIn", signInValidator, auth.signIn);
router.post("/signUp", signUpValidator, auth.signUp);
router.post("/verifyOtp", verifyOtpValidator, auth.verifyOtp);

function signInValidator(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ error: true, message: "Email and password are required" });

  if (password.length < 8)
    return res.status(400).json({ error: true, message: "Password should be at least 8 characters long" });

  next();
}

function signUpValidator(req, res, next) {
  const { username, password, fName, lName, email } = req.body;

  if (!username || !password || !fName || !lName || !email)
    return res.status(400).json({ error: true, message: "Some fields are missing" });

  if (password.length < 8)
    return res.status(400).json({ error: true, message: "Password should be at least 8 characters long" });

  next();
}

function verifyOtpValidator(req, res, next) {
  const { email, otp } = req.body;
  if (!email || !otp) res.status(400).json({ error: true, message: "Some fields are missing" });
  next();
}

router.get("/test", auth.test);
module.exports = router;
