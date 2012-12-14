const { addUser, checkUser, addSchedule, getSchedule, saveSetting, getProfile, deleteSchedule, completeSchedule } = require("./database/db");
const { sendMail } = require("./api/nodemailer");
const cors = require("cors");
const express = require("express");
const userDB = require("./database/model/user");
const app = express();
const PORT = process.env.PORT;
let data = {};
let interval = false;
const resendTime = 1000 * 60; //second to delay;

app.use(express.json(), cors({ origin: process.env.ORIGIN.split(",") }));

app.post("/directADD", async (req, res) => {
  const { username, password, fName, lName, email } = req.body;
  const userData = { username, password, fName, lName, email };
  const status = await addUser(userData);
  if (!status) {
    console.log("Added", userData);
    res.status(200).json({ msg: username + " added" });
    return;
  }
  let msg = status == 403 ? "Username or email is already been taken" : "Wrong inputs";
  res.status(status).json({ msg });
});

app.post("/signUp", async (req, res) => {
  const { username, password, fName, lName, email } = req.body;
  if (data[email]) {
    const time = checkTime(email);
    if (time) {
      console.log("Already sent");
      res.status(409).json({ msg: "OTP already sent", time });
      return;
    }
  }
  const user = await userDB.findOne({ email });
  if (user) {
    console.log("Already a member");
    res.status(302).json({ msg: "Already a member" });
    return;
  }
  try {
    data[email] = { time: 1, username, password, fName, lName };
    const otp = await sendMail(email, fName); // Production
    // const otp = Math.floor(Math.random() * 899999 + 100000); // Developement
    console.log(data[email], email, "->", otp);
    if (!otp) throw "OTP ERROR";
    data[email]["otp"] = otp;
    console.log("The whole data", data[email]);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error while sending email" });
    return;
  }
  if (!interval) validity();
  console.log(email, ":", data[email].otp);
  data[email].time = Date.now();
  res.status(200).json({ msg: "Successfully sent", time: data[email].time });
});

app.post("/verifyOTP", async (req, res) => {
  const { email, otp } = req.body;
  if (!data[email]) {
    console.log("Send OTP First");
    res.status(404).json({ msg: "Send OTP first" });
    return;
  }
  if (data[email].otp != otp) {
    console.log("Wrong OTP");
    res.status(400).json({ msg: "Wrong OTP" });
    return;
  }
  console.log("OTP verfied");
  const username = data[email].username;
  const password = data[email].password;
  const fName = data[email].fName;
  const lName = data[email].lName;
  const userData = { username, password, fName, lName, email };
  console.log("From verify OTP route", userData);
  const status = await addUser(userData);
  if (!status) {
    console.log("Added", userData);
    res.status(200).json({ msg: username + " added" });
    delete data[email];
    return;
  }
  console.log("Wrong inputs", status);
  res.status(status).json({ msg: "Wrong Inputs" });
});

app.post("/signIn", async (req, res) => {
  const { username, password } = req.body;
  const success = await checkUser(username, password);
  if (!success) {
    res.status(403).json({ msg: "Wrong credentials/Cookie not valid" });
    console.log("Wrong credentials/Cookie not valid", { username, password });
    return;
  }
  res.status(200).json({ msg: "Successfully logged in", username });
  console.log("Password verfied", { username, password });
});

app.post("/addSchedule", async (req, res) => {
  const { username, password, schedule } = req.body;
  schedule["completed"] = false;
  const success = await addSchedule(username, password, schedule);
  if (success) {
    console.log("Schedule added successfully", schedule);
    res.status(200).json({ msg: "schedule added successfully" });
    return;
  }
  console.log("Wrong veriication");
  res.status(403).json({ msg: "Wrong verification" });
});

app.post("/getSchedule", async (req, res) => {
  const schedule = await getScheduleRoute(req);
  if (schedule) res.status(200).json(schedule.schedule);
  else {
    console.log("this it the body", req.body);
    res.status(401).json({ msg: "Wrong credentials nigga" });
  }
});

app.get("/getSchedule/:username/:password", async (req, res) => {
  const schedule = await getScheduleRoute({ body: { username: req.params.username, password: req.params.password } });
  if (schedule) res.json(schedule.schedule);
  else res.json({ msg: "Wrong credentials" });
});

app.post("/sendMsg", async (req, res) => {
  const { username, password, recepient } = req.body;
  res.status(200).json({ msg: "Sending message", username, recepient });
});

app.post("/saveSetting", async (req, res) => {
  const { username, fName, lName, oldPassword, password } = req.body;
  let success = await checkUser(username, oldPassword);
  console.table(req.body);
  if (!success) {
    console.log("Wrong username / wrong old password");
    res.status(403).json("Old password is wrong");
    return;
  }
  let status = await saveSetting(username, fName, lName, oldPassword, password);
  if (!status) {
    console.log("Updated successfully");
    res.status(200).json({ msg: "Settings applied successfully" });
    return;
  }
  console.log("Wrong old password");
  res.status(status).json({ msg: "Something went wrong" });
});

app.get("/profile/:username", async (req, res) => {
  const username = req.params.username;
  const data = await getProfile(username);
  if (data) {
    res.status(200).json(data);
    return;
  }
  res.status(404).json({ msg: "not found" });
});

app.delete("/deleteSchedule", async (req, res) => {
  const { username, password, _id } = req.body;
  let success = await checkUser(username, password);
  if (!success) {
    console.log("Wrong username or password");
    res.status(403).json({ msg: "Wrong username or password" });
    return;
  }
  const status = await deleteSchedule(username, _id);
  const msg = status == 404 ? "Schedule Not found" : "Deleted Successfully";
  res.status(status).json({ msg });
});

app.post("/completeSchedule", async (req, res) => {
  const { username, password, _id } = req.body;
  let success = await checkUser(username, password);
  if (!success) {
    console.log("Wrong username or password");
    res.status(403).json({ msg: "Wrong username or password" });
    return;
  }
  const completed = await completeSchedule(_id);
  console.log("The status of completion", completed);
  const msg = completed.status == 200 ? "OK" : "Something went wrong";
  res.status(completed.status).json({ completed: completed.completed, msg });
});

app.get("/", (req, res) => res.status(200).json({ msg: "Everthing looks fine", origin: process.env.ORIGIN.split(",") }));

app.listen(PORT, console.log(`Listening at http://localhost:${PORT}`));

async function getScheduleRoute(req) {
  const { username, password } = req.body;
  if (!(username && password)) return false;
  const schedule = await getSchedule(username, password);
  if (schedule) return schedule;
  console.log("Wrong credentials || Internal server error");
  return false;
}

function checkTime(email) {
  const temp = Date.now() - resendTime;
  if (temp >= data[email].time) {
    return false;
  }
  const remaining = Math.round((data[email].time - temp) / 1000);
  return remaining;
}

// For deleting the mail's instance if not verfied within 10 times Timelimit for every 30 seconds
function validity() {
  interval = setInterval(() => {
    const temp = Date.now() - resendTime * 10;
    const arr = Object.entries(data);
    if (!arr.length) {
      interval = false;
      clearInterval(interval);
    }
    arr.forEach(([key, val]) => {
      if (temp >= val.time) delete data[key];
    });
  }, resendTime);
}
