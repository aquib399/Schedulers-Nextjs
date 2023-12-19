const User = require("../model/user");
const getProfile = async (req, res) => {
  let user;
  try {
    user = await userDB.findOne({ username });
  } catch (err) {
    console.log(err);
    return false;
  }
  if (!user) return false;
  let fName = user.fName;
  let lName = user.lName;
  let scheduleCount = user.schedule.length;
  let completedCount = 0;

  for (const scheduleId of user.schedule) {
    const schedule = await scheduleDB.findById(scheduleId);
    if (schedule?.completed) {
      completedCount++;
    }
  }
  let pendingCount = scheduleCount - completedCount;
  return { fName, lName, scheduleCount, pendingCount, completedCount };
};
const saveSetting = async (req, res) => {
  if (newPassword.length < 8) return 403;
  try {
    const user = await User.findOne({ username });
    console.log("The user is :", user);
    if (!user) return 404; // wrong username
    const success = await checkHash(oldPassword, user.password);
    if (!success) return 403; // wrong password
    const password = await hashPass(newPassword);
    const filter = { username };
    const update = { $set: { fName, lName, password } };
    await User.findOneAndUpdate(filter, update);
    return false;
  } catch (err) {
    console.log(err);
    return 500; //server error
  }
};

const test = (req, res) => {
  console.log("Testing profile -> /profile/test");
  return res.json({ error: false, message: "Profile Test Success" });
};
module.exports = { test, getProfile, saveSetting };
