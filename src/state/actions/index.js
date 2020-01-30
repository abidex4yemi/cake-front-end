export const CREATE_PROFILE = 'create_profile';
export const CREATING_PROFILE = 'creating_profile';

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
