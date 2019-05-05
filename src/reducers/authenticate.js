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

const initialState = {
  isAuth: false,
  requestingAuth: false,
  clearingAuth: false,
  authSession: null,
  authError: "",
  requestingRestore: true,
  logoutError: ""
};

export default function authenticate(state = initialState, action = {}) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        requestingAuth: true,
        authError: ""
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        isAuth: true,
        authSession: action.data.session,
        requestingRestore: false,
        requestingAuth: false
      };
    case LOGIN_FAILED:
      return {
        ...state,
        requestingAuth: false,
        authError: action.data.error
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        clearingAuth: true,
        authError: ""
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        isAuth: false,
        clearingAuth: false,
        authSession: null,
        authError: ""
      };
    case LOGOUT_FAILED:
      return {
        ...state,
        clearingAuth: false,
        authError: action.data.error
      };
    case RESTORE_REQUEST:
      return {
        ...state,
        requestingRestore: true
      };
    case RESTORE_FAILED:
      return {
        ...state,
        requestingRestore: false
      };
    default:
      return state;
  }
}
