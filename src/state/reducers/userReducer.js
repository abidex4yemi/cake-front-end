import { CREATE_PROFILE, CREATING_PROFILE } from '../actions';

const initialState = {
  user: null,
  creatingProfile: false
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
    default:
      return state;
  }
};
