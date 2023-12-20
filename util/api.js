const BASE = "https://backend-1-e4683154.deta.app"; //production
// const BASE = `http://localhost:8080`; // Developement

const SIGN_IN = `/signIn`; // body { username, password}
const SIGN_UP = `/signUp`; // body { username, password, fName, lName, email }
const VERIFY_OTP = `/verifyOTP`; // body { email, otp }
const COMPLETE_SCHEDULE = `/completeSchedule`; // body { username, password, _id: schedule id }
const DELETE_SCHEDULE = `/deleteSchedule`; // body { username, password, _id: schedule id }
const GET_PROFILE = `/getProfile`; // params { /:profile_username } //change api
const SAVE_SETTING = `/saveSetting`; // body { username, oldPassword, fName, lName, password }
const GET_ALL_SCHEDULE = `/getAllSchedule`; // none
const ADD_SCHEDULE = `/addSchedule`; // body { username, password, schedule }

module.exports = {
  BASE,
  SIGN_IN,
  SIGN_UP,
  VERIFY_OTP,
  COMPLETE_SCHEDULE,
  DELETE_SCHEDULE,
  GET_PROFILE,
  SAVE_SETTING,
  GET_ALL_SCHEDULE,
  ADD_SCHEDULE,
};
