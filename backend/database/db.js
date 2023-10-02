const { hashPass, checkHash } = require("../api/encrypt");
const mongoose = require("mongoose");
const userDB = require("./model/user");
const taskDB = require("./model/task");
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
    console.log(user.password);
    return await checkHash(password, user.password);
  } catch (err) {
    console.log(err);
    return 500;
  }
};

exports.addTask = async function getTask(username, password, taskProp) {
  console.table(taskProp);
  try {
    if (!(await checkUser(username, password))) return false;
    if (!taskProp?.completedCount) {
      taskProp.completedCount = false;
    }
    const task = new taskDB(taskProp);
    const user = await userDB.findOne({ username });
    user.task.push(task._id);
    await user.save();
    await task.save();
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
};

exports.getTask = async function getTask(username, password) {
  try {
    if (!(await checkUser(username, password))) return false;
    const userTasks = await userDB
      .findOne({ username })
      .select({
        username: true,
        task: true,
      })
      .populate("task");
    return userTasks;
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
  let taskCount = user.task.length;
  let completedCount = 0;

  for (const taskId of user.task) {
    const task = await taskDB.findById(taskId);
    if (task?.completed) {
      completedCount++;
    }
  }
  let pendingCount = taskCount - completedCount;
  return { fName, lName, taskCount, pendingCount, completedCount };
};
