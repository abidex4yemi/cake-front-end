const validateLoginForm = (user) => {
  let errors = {};
  const userData = Object.entries(user);

  for (let [key, value] of userData) {
    if (value.trim() === '') {
      errors[key] = `${key.toLowerCase()} is required`;
    } else {
      delete errors[key];
    }
  }

  return errors;
};

export default validateLoginForm;
