const router = require("express").Router();
const profile = require("../controller/profileController");

router.get("/getProfile", profile.getProfile);
router.post("/saveSetting", settingValidator, profile.saveSetting);

function settingValidator(req, res, next) {
  const { username, oldPassword, fName, lName, password } = req.body;
  if (!username || !oldPassword || !fName || !lName || !password)
    return res.status(400).json({ error: true, message: "Some fields are missing" });
  next();
}

router.get("/test", profile.test);
module.exports = router;
