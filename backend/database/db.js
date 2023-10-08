const { hashPass, checkHash } = require("../api/encrypt");
const mongoose = require("mongoose");
const userDB = require("./model/user");
const scheduleDB = require("./model/schedule");
mongoose.connect(process.env.URL);
const db = mongoose.connection;
db.on("open", () => console.log("DB Connected"));
db.on("error", (err) => console.log(err));

exports.addUser = async function addUser(userData) {
  let { username, password, fName, lName, email } = userData;
  console.log("Add user->", userData);
  try {
    if (!(password.length >= 8 && username.length >= 3, fName.length && lName.length && email.length >= 6 && password.length >= 8))
      throw { status: 406 };
    password = await hashPass(password);
    await userDB.create({ username, password, fName, lName, email });
    return false;
  } catch (err) {
    console.log(err.status || 403);
    // fasle : success
    // 406 - short password
    // 403 - wrong inputs
    return err.status || 403;
  }
};

exports.checkUser = checkUser = async function checkUser(username, password) {
  try {
    const user = await userDB.findOne({ username });
    if (!user) return false;
    return await checkHash(password, user.password);
  } catch (err) {
    console.log(err);
    return false;
  }
};

exports.addSchedule = async function getSchedule(username, password, scheduleProp) {
  console.table(scheduleProp);
  try {
    if (!(await checkUser(username, password))) return false;
    if (!scheduleProp?.completedCount) {
      scheduleProp.completedCount = false;
    }
    const schedule = new scheduleDB(scheduleProp);
    const user = await userDB.findOne({ username });
    user.schedule.push(schedule._id);
    await user.save();
    await schedule.save();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

exports.getSchedule = async function getSchedule(username, password) {
  try {
    if (!(await checkUser(username, password))) return false;
    const userSchedules = await userDB
      .findOne({ username })
      .select({
        username: true,
        schedule: true,
      })
      .populate("schedule");
    return userSchedules;
  } catch (err) {
    console.log(err);
    return false;
  }
};

exports.saveSetting = async function saveSetting(username, fName, lName, oldPassword, newPassword) {
  if (newPassword.length < 8) return 403;
  try {
    const user = await userDB.findOne({ username });
    console.log("The user is :", user);
    if (!user) return 404; // wrong username
    const success = await checkHash(oldPassword, user.password);
    if (!success) return 403; // wrong password
    const password = await hashPass(newPassword);
    const filter = { username };
    const update = { $set: { fName, lName, password } };
    await userDB.findOneAndUpdate(filter, update);
    return false;
  } catch (err) {
    console.log(err);
    return 500; //server error
  }
};

exports.getProfile = async function getProfile(username) {
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

exports.deleteSchedule = async function deleteSchedule(username, _id) {
  try {
    const success = await scheduleDB.deleteOne({ _id });
    console.log("Sucess :", success);
    if (success.deletedCount) {
      let arr = await userDB.findOne({ username });
      const x = new mongoose.Types.ObjectId(_id);
      console.log("---------------->", x);
      arr.schedule.remove(x);
      await arr.save();
      return 200;
    }
  } catch (err) {
    console.log(err);
    return 404;
  }
};

exports.completeSchedule = async function completeSchedule(_id) {
  try {
    const schedule = await scheduleDB.findOne({ _id });
    if (!schedule) return false;
    const completed = !schedule.completed;
    const success = await scheduleDB.updateOne({ _id }, { $set: { completed } });
    if (success.modifiedCount) {
      console.log(success);
      return { status: 200, completed }; //OK
    }
    return { status: 404, completed };
  } catch (err) {
    return { status: 404, completed };
  }
};
