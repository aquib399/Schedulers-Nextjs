// Express
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT;

// Database
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGO_URL);
const db = mongoose.connection;
db.on("open", () => console.log("MongoDB Connected"));
db.on("error", (err) => console.log("ERROR-----------------------", err));

// Config
// app.use(express.json(), cors({ origin: process.env.ORIGIN.split(",") }));
app.use(express.json(), cors({ origin: ["*"] }));
const { authenticate } = require("./util/authenticate");
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
  res.json({
    error: false,
    message: "Everthing looks fine",
    origin: process.env.ORIGIN.split(" "),
    payload: req.body,
  })
);

app.listen(PORT, console.log(`\x1b[36mServer listening at \x1b[33mhttp://localhost:${PORT}\x1b[0m`));
