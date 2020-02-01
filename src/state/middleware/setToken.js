export const setToken = (store) => (next) => (action) => {
  // Get token from browser local storage
  let token = '';

  if (action.type === 'logged_in' || action.type === 'create_profile') {
    token = action.payload.token;

    localStorage.setItem('cake-user-token', token);
  }

  next(action);
};
