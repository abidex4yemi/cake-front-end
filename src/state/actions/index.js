export const CREATE_PROFILE = 'create_profile';
export const CREATING_PROFILE = 'creating_profile';

export const UPDATE_PROFILE = 'update_profile';
export const UPDATING_PROFILE = 'updating_profile';

export const LOGIN_IN = 'login_in';
export const LOGGED_IN = 'logged_in';

export const createProfile = (profileData) => (dispatch, getState, api) => {
  dispatch({ type: CREATING_PROFILE, payload: true });

  return api
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

export const updateProfile = (profileData) => (dispatch, getState, api) => {
  dispatch({ type: UPDATING_PROFILE, payload: true });

  return api
    .post('/profile', profileData)
    .then((res) => {
      dispatch({ type: UPDATING_PROFILE, payload: false });

      dispatch({
        type: UPDATE_PROFILE,
        payload: res.data.body
      });

      return res;
    })
    .catch((err) => {
      dispatch({ type: UPDATING_PROFILE, payload: false });
      return err;
    });
};

export const login = (credentials) => (dispatch, getState, api) => {
  dispatch({ type: LOGIN_IN, payload: true });

  return api
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
