const validateProfileForm = (profile) => {
  const errors = {};
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
        errors[key] = '';
      }
    } else if (typeof value === 'string') {
      if (value.trim() === '') {
        errors[key] = `${key.toLowerCase()} is required`;
      } else {
        errors[key] = '';
      }
    }
  }

  if (profile.password !== profile.confirmPassword) {
    errors.confirmPassword = 'password does not match';
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  return errors;
};

export default validateProfileForm;
