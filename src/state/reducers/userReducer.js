import {
  CREATE_PROFILE,
  CREATING_PROFILE,
  LOGGED_IN,
  LOGIN_IN,
  UPDATE_PROFILE,
  UPDATING_PROFILE
} from '../actions';

const initialState = {
  user: null,
  creatingProfile: false,
  auth: false,
  loginIn: false,
  updatingProfile: false
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_PROFILE:
      return {
        ...state,
        ...action.payload
      };
    case CREATING_PROFILE:
      return {
        ...state,
        creatingProfile: action.payload
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        ...action.payload
      };
    case UPDATING_PROFILE:
      return {
        ...state,
        updatingProfile: action.payload
      };
    case LOGIN_IN:
      return {
        ...state,
        loginIn: action.payload
      };
    case LOGGED_IN:
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};
