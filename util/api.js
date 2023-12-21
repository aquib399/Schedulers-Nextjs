// const BASE = "https://backend-1-e4683154.deta.app"; //production
const BASE_URL = `http://localhost:8080`; // Developement

// auth
const SIGN_IN = `/auth/signIn`; // body { username, password}
const SIGN_UP = `/auth/signUp`; // body { username, password, fName, lName, email }
const VERIFY_OTP = `/auth/verifyOTP`; // body { email, otp }

// Profile
const GET_PROFILE = `/api/getProfile`; // params { /:profile_username } //change api
const EDIT_PROFILE = `/api/editProfile`; // body { username, oldPassword, fName, lName, password }

// Schedules
const GET_ALL_SCHEDULE = `/api/getAllSchedule`; // none
const ADD_SCHEDULE = `/api/addSchedule`; // body { username, password, schedule }
const EDIT_SCHEDULE = `/api/editSchedule`; // body { username, password, schedule }
const SET_SCHEDULE_STATUS = `/api/setScheduleStatus`; // body { username, password, _id: schedule id }
const DELETE_SCHEDULE = `/api/deleteSchedule`; // body { username, password, _id: schedule id }

module.exports = {
  BASE_URL,
  // Auth
  SIGN_IN,
  SIGN_UP,
  VERIFY_OTP,
  // Profile
  GET_PROFILE,
  EDIT_PROFILE,
  // Schedule
  GET_ALL_SCHEDULE,
  ADD_SCHEDULE,
  EDIT_SCHEDULE,
  SET_SCHEDULE_STATUS,
  DELETE_SCHEDULE,
};
