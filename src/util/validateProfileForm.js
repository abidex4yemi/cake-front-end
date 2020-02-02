const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const validateProfileForm = (profile) => {
  let errors = {};
  const profileData = Object.entries(profile);

  for (let [key, value] of profileData) {
    if (typeof value === 'object') {
      if (
        value.firstQuestion.answer.trim() === '' ||
        value.secondQuestion.answer.trim() === '' ||
        value.thirdQuestion.answer.trim() === ''
      ) {
        errors[key] = `all ${key} are required`;
      } else {
        delete errors[key];
      }
    } else if (typeof value === 'string') {
      if (value.trim() === '') {
        errors[key] = `${key
          .toLowerCase()
          .charAt(0)
          .toUpperCase()}${key.slice(1)} is required`;
      } else {
        delete errors[key];
      }

      if (key === 'password' && value.trim().length < 6) {
        errors.password = 'Password must be at least six(6) characters';
      }
    }
  }

  if (!validateEmail(profile.email.trim())) {
    errors.email = 'Enter a valid email address';
  } else {
    delete errors.email;
  }

  if (profile.password !== profile.confirmPassword) {
    errors.confirmPassword = 'Password does not match';
  } else {
    delete errors.confirmPassword;
  }

  return errors;
};

export default validateProfileForm;
