const User = require("../model/user");
const { hashPass, checkHash } = require("../util/encrypt");

const getProfile = async (req, res) => {
  const username = req.username;
  try {
    const user = await User.findOne({ username }).populate("schedule");
    if (!user)
      return res.status(400).json({ error: true, message: "Something went wrong, please login again" });
    const fName = user.fName;
    const lName = user.lName;
    const scheduleCount = user.schedule.length;
    const completedCount = user.schedule.filter((schedule) => schedule.completed).length;
    const pendingCount = scheduleCount - completedCount;

    const payload = { fName, lName, scheduleCount, pendingCount, completedCount };
    return res.json({ error: false, message: `${username}'s profile details`, payload });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

const saveSetting = async (req, res) => {
  const username = req.username;
  const { newPassword, oldPassword, fName, lName } = req.body;
  console.log({ username, ...req.body });
  try {
    const user = await User.findOne({ username });
    console.log("The user is :", user);
    if (!user) return res.status(404).json({ error: true, message: "No user found" });

    const success = await checkHash(oldPassword, user.password);
    if (!success) return res.status(403).json({ error: true, message: "Wrong old password" });

    const password = await hashPass(newPassword);
    user.fName = fName;
    user.lName = lName;
    user.password = password;
    await user.save();
    return res.json({ error: false, message: "Information updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
};

const test = (req, res) => {
  console.log("Testing profile -> /profile/test");
  return res.json({ error: false, message: "Profile Test Success", payload: req.body });
};
module.exports = { test, getProfile, saveSetting };
