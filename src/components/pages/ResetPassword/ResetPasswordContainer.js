import React, { useState } from 'react';
import { connect } from 'react-redux';
import {
  getUserSecurityQuestions,
  resetPassword
} from '../../../state/actions';
import ResetPassword from './ResetPassword';
import validateResetPasswordForm from '../../../util/validateResetPasswordForm';

/**
 * Password Reset `Container component`
 * Note: container component only contains logic no `JSX`
 * this pattern of composing component allows separation of
 * logic from views
 *
 * @param {*} props
 * @returns {Object}
 */
const ResetPasswordContainer = (props) => {
  const {
    resetting,
    userExistingSecurityQuestions,
    fetchingSecurityQuestions
  } = props.data;

  const [user, setUser] = useState({
    email: '',
    newPassword: '',
    confirmPassword: '',
    securityQuestions: {
      firstQuestion: {
        answer: '',
        question: '',
        id: ''
      },
      secondQuestion: {
        answer: '',
        question: '',
        id: ''
      },
      thirdQuestion: {
        answer: '',
        question: '',
        id: ''
      }
    }
  });

  const [errors, setErrors] = useState({});

  const [showSecurityQuestions, setShowSecurityQuestions] = useState(false);

  const inputChange = (field, value) => {
    setUser({
      ...user,
      [field]: value
    });
  };

  const handleFirstQuestion = (data) => {
    setUser((prevState) => {
      return {
        ...prevState,
        securityQuestions: {
          ...prevState.securityQuestions,
          firstQuestion: {
            ...data
          }
        }
      };
    });
  };

  const handleSecondQuestion = (data) => {
    setUser((prevState) => {
      return {
        ...prevState,
        securityQuestions: {
          ...prevState.securityQuestions,
          secondQuestion: {
            ...data
          }
        }
      };
    });
  };

  const handleThirdQuestion = (data) => {
    setUser((prevState) => {
      return {
        ...prevState,
        securityQuestions: {
          ...prevState.securityQuestions,
          thirdQuestion: {
            ...data
          }
        }
      };
    });
  };

  const handleRequestReset = (evt) => {
    evt.preventDefault();
    let validateSecurityQuestions = false;

    if (showSecurityQuestions) {
      validateSecurityQuestions = true;
    }

    const errors = validateResetPasswordForm(user, validateSecurityQuestions);

    setErrors(() => errors);

    if (Object.values(errors).length) {
      window.scrollTo(0, 0);
      return;
    }

    if (!showSecurityQuestions) {
      props.getUserSecurityQuestions(user.email).then((res) => {
        if (res.data !== undefined && res.status === 200) {
          setShowSecurityQuestions(true);
        }

        if (res.response && res.response.status === 404) {
          setErrors((prevState) => ({
            ...prevState,
            email: 'wrong email address'
          }));
        }
      });
    }

    const {
      newPassword,
      email,
      securityQuestions: { firstQuestion, secondQuestion, thirdQuestion }
    } = user;

    const userDetails = {
      newPassword,
      email,
      securityAnswers: [firstQuestion, secondQuestion, thirdQuestion]
    };

    if (showSecurityQuestions) {
      props.resetPassword(userDetails).then((res) => {
        if (res.data !== undefined && res.status === 201) {
          localStorage.removeItem('cake-user-token');
          localStorage.removeItem('persist:data-cake');
          setTimeout(() => props.history.push('/login'), 4000);
        }

        if (res.response && res.response.status === 404) {
          setErrors((prevState) => ({
            ...prevState,
            email: 'wrong email address'
          }));
        }

        if (res.response && res.response.status === 400) {
          setErrors((prevState) => ({
            ...prevState,
            securityQuestions: 'Please provide valid security answers'
          }));
        }
      });
    }
  };

  return (
    <ResetPassword
      user={user}
      errors={errors}
      inputChange={inputChange}
      resetting={resetting}
      handleRequestReset={handleRequestReset}
      showSecurityQuestions={showSecurityQuestions}
      questions={userExistingSecurityQuestions}
      handleFirstQuestion={handleFirstQuestion}
      handleSecondQuestion={handleSecondQuestion}
      handleThirdQuestion={handleThirdQuestion}
      fetchingSecurityQuestions={fetchingSecurityQuestions}
    />
  );
};

const mapStateToProps = (state) => state;

export default connect(mapStateToProps, {
  getUserSecurityQuestions,
  resetPassword
})(ResetPasswordContainer);
