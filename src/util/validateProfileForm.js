const validateProfileForm = (profile) => {
  let errors = {};
  const ProfileData = Object.entries(profile);

  for (let [key, value] of ProfileData) {
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
        errors[key] = `${key.toLowerCase()} is required`;
      } else {
        delete errors[key];
      }

      if (key === 'password' && value.trim().length < 6) {
        errors.password = 'password must be at least six(6) characters';
      }
    }
  }

  if (profile.password !== profile.confirmPassword) {
    errors.confirmPassword = 'password does not match';
  } else {
    delete errors.confirmPassword;
  }

  return errors;
};

export default validateProfileForm;
