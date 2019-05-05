import { AsyncStorage } from "react-native";
import { DATA_SESSION } from "../config/global";

import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  LOGOUT_FAILED,
  RESTORE_SESSION,
  RESTORE_REQUEST,
  RESTORE_FAILED
} from "../config/redux-action-types/authenticate";

export function login(email, password) {
  return async dispatch => {
    dispatch(loginRequest());
    try {
      if (email.trim() === "prashant@gmail.com" && password === "prashant123") {
        const session = {
          token: "abc1234",
          email: email,
          username: "prashant"
        };
        await AsyncStorage.setItem(DATA_SESSION, JSON.stringify(session));
        setTimeout(() => {
          dispatch(loginSuccess(session));
        }, 1500);
      } else {
        setTimeout(() => {
          dispatch(loginFailed("Incorrect email or password"));
        }, 1500);
      }
    } catch (err) {
      console.log(err);
      dispatch(loginFailed("Something went wrong"));
    }
  };
}

export function restoreSession() {
  return async dispatch => {
    dispatch(restoreRequest());
    try {
      const session = await AsyncStorage.getItem(DATA_SESSION);
      if (session != null) {
        dispatch(loginSuccess(JSON.parse(session)));
      } else {
        dispatch(restoreFailed());
      }
    } catch (err) {
      dispatch(restoreFailed());
    }
  };
}

export function logout() {
  return async dispatch => {
    dispatch(logoutRequest());
    try {
      setTimeout(async () => {
        await AsyncStorage.removeItem(DATA_SESSION);
        dispatch(logoutSuccess());
      }, 1500);
    } catch (err) {
      dispatch(logoutFailed("Something went wrong"));
    }
  };
}

function loginRequest() {
  return {
    type: LOGIN_REQUEST
  };
}

function loginSuccess(session) {
  return {
    type: LOGIN_SUCCESS,
    data: {
      session
    }
  };
}

function loginFailed(error) {
  if (!error) {
    error = "Network Error";
  }
  return {
    type: LOGIN_FAILED,
    data: {
      error: error
    }
  };
}

function logoutRequest() {
  return {
    type: LOGOUT_REQUEST
  };
}

function logoutSuccess() {
  return {
    type: LOGOUT_SUCCESS
  };
}

function logoutFailed(error) {
  if (!error) {
    error = "Network Error";
  }
  return {
    type: LOGOUT_FAILED,
    data: {
      error: error
    }
  };
}

function restoreRequest() {
  return {
    type: RESTORE_REQUEST
  };
}

function restoreFailed() {
  return {
    type: RESTORE_FAILED
  };
}
