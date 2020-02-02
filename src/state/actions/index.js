import { flashMessage } from 'redux-flash';
import api from '../../api';

export const CREATE_PROFILE = 'create_profile';
export const CREATING_PROFILE = 'creating_profile';

export const RESET_PASSWORD = 'reset_password';

export const FETCHING_SECURITY_QUESTIONS = 'fetching_security_questions';

export const UPDATE_PROFILE = 'update_profile';
export const UPDATING_PROFILE = 'updating_profile';

export const LOGIN_IN = 'login_in';
export const LOGGED_IN = 'logged_in';

export const createProfile = (profileData) => (dispatch) => {
  dispatch({ type: CREATING_PROFILE, payload: true });

  return api()
    .post('/signup', profileData)
    .then((res) => {
      dispatch({ type: CREATING_PROFILE, payload: false });

      dispatch({
        type: CREATE_PROFILE,
        payload: res.data.body
      });

      return res;
    })
    .catch((err) => {
      dispatch({ type: CREATING_PROFILE, payload: false });
      return err;
    });
};

export const updateProfile = (profileData) => (dispatch) => {
  dispatch({ type: UPDATING_PROFILE, payload: true });

  return api()
    .put('/profile', profileData)
    .then((res) => {
      dispatch({ type: UPDATING_PROFILE, payload: false });

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data.body
      });

      const action = flashMessage('Profile updated successfully');
      dispatch(action);

      return res;
    })
    .catch((err) => {
      dispatch({ type: UPDATING_PROFILE, payload: false });
      return err;
    });
};

export const login = (credentials) => (dispatch) => {
  dispatch({ type: LOGIN_IN, payload: true });

  return api()
    .post('/login', credentials)
    .then((res) => {
      dispatch({ type: LOGIN_IN, payload: false });

      dispatch({
        type: LOGGED_IN,
        payload: res.data.body
      });

      return res;
    })
    .catch((err) => {
      dispatch({ type: LOGIN_IN, payload: false });
      return err;
    });
};

export const getUserSecurityQuestions = (email) => (dispatch) => {
  dispatch({
    type: FETCHING_SECURITY_QUESTIONS,
    payload: {
      fetchingSecurityQuestions: true,
      userExistingSecurityQuestions: []
    }
  });

  return api()
    .get(`/users/security-questions?email=${email}`)
    .then((res) => {
      dispatch({
        type: FETCHING_SECURITY_QUESTIONS,
        payload: {
          fetchingSecurityQuestions: false,
          userExistingSecurityQuestions: res.data.body.securityQuestions
        }
      });

      return res;
    })
    .catch((err) => {
      dispatch({
        type: FETCHING_SECURITY_QUESTIONS,
        payload: {
          fetchingSecurityQuestions: false
        }
      });
      return err;
    });
};

export const resetPassword = (newDetails) => (dispatch) => {
  dispatch({
    type: RESET_PASSWORD,
    payload: {
      resetting: true
    }
  });

  return api()
    .put('/user/reset-password', newDetails)
    .then((res) => {
      dispatch({
        type: RESET_PASSWORD,
        payload: {
          resetting: false
        }
      });

      dispatch({
        type: RESET_PASSWORD,
        payload: { passwordResetMessage: res.data.message }
      });

      const action = flashMessage('Password reset successful, please login');
      dispatch(action);

      return res;
    })
    .catch((err) => {
      dispatch({
        type: RESET_PASSWORD,
        payload: {
          resetting: false
        }
      });
      return err;
    });
};
