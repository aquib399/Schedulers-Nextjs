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
    // 403 - forbidden
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
    return 500;
  }
};

exports.addTask = async function getTask(username, password, taskProp) {
  console.table(taskProp);
  try {
    if (!(await checkUser(username, password))) return false;
    if (!taskProp?.completed) {
      taskProp.completed = false;
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
