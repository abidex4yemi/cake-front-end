export const setToken = (store) => (next) => (action) => {
  // Get token from browser local storage
  let token = '';

  if (action.type === 'CREATE_PROFILE') {
    token = action.payload.token;
    // Save token to local storage
    localStorage.setItem('token', token);
  }

  next(action);
};
