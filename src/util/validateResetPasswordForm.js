const validateEmail = (email) => {
  // eslint-disable-next-line no-useless-escape
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const validateResetPasswordForm = (user, validateSecurityQuestions) => {
  let errors = {};
  const { email, newPassword, confirmPassword, securityQuestions } = user;

  if (validateSecurityQuestions && securityQuestions) {
    if (
      securityQuestions.firstQuestion.answer.trim() === '' ||
      securityQuestions.secondQuestion.answer.trim() === '' ||
      securityQuestions.thirdQuestion.answer.trim() === ''
    ) {
      errors.securityQuestions = `all security questions are required`;
    } else {
      delete errors.securityQuestions;
    }

    if (!newPassword || newPassword.trim() === '') {
      errors.newPassword = `Password field is required`;
    } else {
      delete errors.newPassword;
    }

    if (newPassword.trim() !== '' && newPassword.length < 6) {
      errors.newPassword = 'password must be at least six(6) characters';
    }

    if (newPassword.trim() !== '' && newPassword !== confirmPassword) {
      errors.confirmPassword = 'password does not match';
    }

    if (newPassword.trim() === confirmPassword.trim()) {
      delete errors.confirmPassword;
    }
  }

  if (!email) {
    errors.email = 'Email field is required';
  } else if (!validateEmail(email.trim())) {
    errors.email = 'Enter a valid email address';
  } else {
    delete errors.email;
  }

  return errors;
};

export default validateResetPasswordForm;
