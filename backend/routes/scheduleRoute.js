const router = require("express").Router();
const schedule = require("../controller/scheduleController");
const { Types } = require("mongoose");

router.get("/getAllSchedule", schedule.getAllSchedule);
router.post("/addSchedule", addScheduleValidator, schedule.addSchedule);
router.post("/editSchedule", scheduleIdValidator, addScheduleValidator, schedule.editSchedule);
router.post("/deleteSchedule", scheduleIdValidator, schedule.deleteSchedule);
router.post("/setScheduleStatus", scheduleIdValidator, schedule.setScheduleStatus);

function addScheduleValidator(req, res, next) {
  const { title, description, time, type } = req.body;
  try {
    if (!title) throw "Title is required";
    if (!description) throw "Description is required";
    if (!time) throw "Time stamp is required";
    if (!type) throw "Type is required";
    next();
  } catch (message) {
    return res.status(400).json({ error: true, message });
  }
}
function scheduleIdValidator(req, res, next) {
  const { id } = req.body;
  try {
    if (!id) throw "Schedule id is required";
    if (id.toString().length != 24) throw "Schedule id has to be 24 in length";
    req.id = new Types.ObjectId(id);
    next();
  } catch (message) {
    if (typeof message == "object") message = "Invalid schedule id";
    return res.status(400).json({ error: true, message: message || "Invalid schedule id" });
  }
}

router.get("/test", schedule.test);
module.exports = router;
