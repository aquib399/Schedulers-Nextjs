const router = require("express").Router();
const schedule = require("../controller/scheduleController");

router.get("/test", schedule.test);
module.exports = router;
