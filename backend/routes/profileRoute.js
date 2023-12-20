const router = require("express").Router();
const profile = require("../controller/profileController");

router.get("/getProfile", profile.getProfile);
router.post("/editProfile", settingValidator, profile.editProfile);

function settingValidator(req, res, next) {
  const { oldPassword, fName, lName, newPassword } = req.body;
  
  try {
    if (!oldPassword) throw "Old password is required";
    if (!newPassword) throw "New password is required";
    if (!fName) throw "First name is required";
    if (!lName) throw "Last name is required";
    if (oldPassword.toString().length < 8) throw "Wrong old password";
    if (newPassword.toString().length < 8) throw "New password should be at least 8 characters long";
    next();
  } catch (message) {
    return res.status(400).json({ error: true, message });
  }
}

router.get("/test", profile.test);
module.exports = router;
