const router = require("express").Router();
const chat = require("../controller/chatController");

router.get("/test", chat.test);
module.exports = router;
