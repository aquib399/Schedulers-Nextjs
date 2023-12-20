const Schedule = require("../model/schedule");
const User = require("../model/user");

async function addSchedule(req, res) {
  const username = req.username;

  const { title, description, time, type } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ error: true, message: "No user found" });

    const schedule = new Schedule({ title, description, time, type, completed: 0, user: user._id });

    user.schedule.push(schedule._id);

    await user.save();
    await schedule.save();
    return res.json({ error: false, message: "Schedule added successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ error: true, message: "Internal server error" });
  }
}

async function editSchedule(req, res) {
  const { title, description, time, type } = req.body;
  const username = req.username;
  const id = req.id;

  try {
    const user = await User.findOne({ username }).select("schedule");

    if (!user.schedule.includes(id))
      return res.status(404).json({ error: true, message: "Schedule not found" });

    await Schedule.findByIdAndUpdate(id, { $set: { title, description, time, type } });

    return res.json({ error: false, message: "Schedule updated successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
}

async function deleteSchedule(req, res) {
  const username = req.username;
  const id = req.id;

  try {
    const user = await User.findOne({ username }).select("schedule");

    if (!user.schedule.includes(id))
      return res.status(404).json({ error: true, message: "Schedule not found" });

    user.schedule.remove(id);
    user.save();
    await Schedule.findByIdAndDelete(id);
    return res.json({ error: false, message: "Schedule deleted successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
}

async function setScheduleStatus(req, res) {
  const username = req.username;
  const id = req.id;
  try {
    const user = await User.findOne({ username }).select("schedule");

    if (!user.schedule.includes(id))
      return res.status(404).json({ error: true, message: "Schedule not found" });

    const schedule = await Schedule.findById(id);
    schedule.completed = !schedule.completed;
    schedule.save();
    return res.json({ error: false, message: `Schedule status updated` });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
}

async function getAllSchedule(req, res) {
  const username = req.username;
  try {
    const schedules = await User.findOne({ username })
      .select({
        username: true,
        schedule: true,
      })
      .populate("schedule");

    if (!schedules.schedule.length)
      return res.status(404).json({ error: true, message: "No schedules found" });

    return res.json({ error: false, message: "Schedule found", payload: schedules.schedule });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: true, message: "Internal server error" });
  }
}

async function test(req, res) {
  console.log("Testing schedule -> /schedule/test");
  return res.json({ error: false, message: "Schedule Test Success", payload: req.body });
}
module.exports = {
  test,
  addSchedule,
  editSchedule,
  deleteSchedule,
  setScheduleStatus,
  getAllSchedule,
};
