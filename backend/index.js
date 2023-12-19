const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;
const { authenticate } = require("./util/authenticate");

// Config
app.use(express.json(), cors({ origin: process.env.ORIGIN.split(",") }));
app.use("/api", authenticate);

// Routes
const authRoute = require("./routes/authRoute");
const chatRoute = require("./routes/chatRoute");
const profileRoute = require("./routes/profileRoute");
const scheduleRoute = require("./routes/scheduleRoute");

// Middlewares
app.use("/auth", authRoute);
app.use("/api/chat", chatRoute);
app.use("/api/profile", profileRoute);
app.use("/api/schedule", scheduleRoute);

app.get("/", (req, res) =>
  res.json({ error: false, message: "Everthing looks fine", origin: process.env.ORIGIN.split(" ") })
);
app.listen(PORT, console.log(`Listening at http://localhost:${PORT}`));
