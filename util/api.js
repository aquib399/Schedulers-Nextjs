const BASE_URL = "https://schedulers.cyclic.app/"; //production
// const BASE_URL = `http://localhost:8080`; // Developement

// auth
const SIGN_IN = `/auth/signIn`; // body { username, password}
const SIGN_UP = `/auth/signUp`; // body { username, password, fName, lName, email }
const VERIFY_OTP = `/auth/verifyOTP`; // body { email, otp }
const VALIDATE = `/auth/validate`; // body { email, otp }

// Profile
const GET_PROFILE = `/api/profile/getProfile`; // params { /:profile_username } //change api
const EDIT_PROFILE = `/api/profile/editProfile`; // body { username, oldPassword, fName, lName, password }

// Schedules
const GET_ALL_SCHEDULE = `/api/schedule/getAllSchedule`; // none
const ADD_SCHEDULE = `/api/schedule/addSchedule`; // body { username, password, schedule }
const EDIT_SCHEDULE = `/api/schedule/editSchedule`; // body { username, password, schedule }
const SET_SCHEDULE_STATUS = `/api/schedule/setScheduleStatus`; // body { username, password, _id: schedule id }
const DELETE_SCHEDULE = `/api/schedule/deleteSchedule`; // body { username, password, _id: schedule id }

module.exports = {
  BASE_URL,
  // Auth
  SIGN_IN,
  SIGN_UP,
  VERIFY_OTP,
  VALIDATE,
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
