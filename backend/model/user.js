const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    fName: {
      type: String,
      required: false,
    },
    lName: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    schedule: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "schedule",
      },
    ],
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const userDB = mongoose.model("user", userSchema);
module.exports = userDB;
