const { Types } = require("mongoose");
const Schedule = require("../model/schedule");
const User = require("../model/user");

const addSchedule = async (req, res) => {
  const scheduleProp = {};
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

const editSchedule = async (req, res) => {};

const deleteSchedule = async (req, res) => {
  try {
    const success = await Schedule.findByIdAndDelete(_id);
    console.log("Sucess :", success);
    if (success.deletedCount) {
      let arr = await User.findOne({ username });
      const x = new Types.ObjectId(_id);
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

const completeSchedule = async (req, res) => {
  const { _id } = req.body;
  try {
    const schedule = await Schedule.findById(_id);
    const completed = !schedule.completed;
    const success = await Schedule.updateOne({ _id }, { $set: { completed } });

    if (success.modifiedCount) {
      console.log(success);
      return { status: 200, completed };
    }

    return { status: 404, completed };
  } catch (err) {
    return { status: 404, completed };
  }
};

const getAllSchedule = async (req, res) => {
  try {
    if (!(await checkUser(username, password))) return false;
    const userSchedules = await User.findOne({ username })
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

const test = (req, res) => {
  console.log("Testing schedule -> /schedule/test");
  return res.json({ error: false, message: "Schedule Test Success", payload: req.body });
};
module.exports = {
  test,
  addSchedule,
  editSchedule,
  deleteSchedule,
  completeSchedule,
  getAllSchedule,
};
