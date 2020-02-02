import React from 'react';
import styled from 'styled-components';
import Loader from 'react-loader-spinner';
import { Button, Input, SecurityQuestion } from '../../molecules';
import FlashMessages from '../../molecules/FlashMessages';
import {
  ContainerStyled,
  borderRadius,
  white,
  boxShadow,
  SmallStyled,
  InputGroupStyled
} from '../../atom';

/**
 * This is a dumb component with no logic
 *
 * @param {*} props
 * @returns {object}
 */
const ResetPassword = (props) => {
  const {
    handleSubmit,
    inputChange,
    resetting,
    user,
    errors,
    handleRequestReset,
    questions,
    showSecurityQuestions,
    fetchingSecurityQuestions
  } = props;

  return (
    <main>
      <ContainerStyled>
        <MainWrapper>
          <FormContainer>
            <h3>Password Reset</h3>
            {errors.securityAnswer && (
              <p>
                <SmallStyled>{errors.securityAnswer}</SmallStyled>
              </p>
            )}

            <form onSubmit={handleSubmit}>
              <Input
                type="text"
                name="email"
                inputChange={inputChange}
                error={errors.email}
                value={user.email}
                labelText="Email"
              />

              {showSecurityQuestions && (
                <>
                  <Input
                    type="password"
                    name="newPassword"
                    inputChange={inputChange}
                    error={errors.newPassword}
                    value={user.newPassword}
                    labelText="New password"
                  />

                  <Input
                    type="password"
                    name="confirmPassword"
                    inputChange={inputChange}
                    error={errors.confirmPassword}
                    value={user.confirmPassword}
                    labelText="Re-Type new password"
                  />
                </>
              )}

              {showSecurityQuestions && (
                <>
                  <p>Answer all security questions.</p>
                  <SmallStyled>{errors.securityQuestions || ''}</SmallStyled>
                  <InputGroupStyled>
                    <span>Question 1.</span>
                    <SecurityQuestion
                      questions={[questions[0]]}
                      getData={props.handleFirstQuestion}
                    />
                  </InputGroupStyled>

                  <InputGroupStyled>
                    <small>Question 2.</small>
                    <SecurityQuestion
                      questions={[questions[1]]}
                      getData={props.handleSecondQuestion}
                    />
                  </InputGroupStyled>

                  <InputGroupStyled>
                    <small>Question 3.</small>
                    <SecurityQuestion
                      questions={[questions[2]]}
                      getData={props.handleThirdQuestion}
                    />
                  </InputGroupStyled>
                </>
              )}

              <FlashMessages />

              <Button
                buttonText={
                  (fetchingSecurityQuestions && (
                    <Loader
                      type="TailSpin"
                      color="#f4f4f4"
                      height={35}
                      width={35}
                    />
                  )) ||
                  (resetting && (
                    <Loader
                      type="TailSpin"
                      color="#f4f4f4"
                      height={35}
                      width={35}
                    />
                  )) ||
                  'Request reset'
                }
                onClick={handleRequestReset}
                type="submit"
              />
            </form>
          </FormContainer>
        </MainWrapper>
      </ContainerStyled>
    </main>
  );
};

export default ResetPassword;

const MainWrapper = styled.section`
  display: flex;
  padding: 10rem 0;
  justify-content: space-around;
  align-items: center;
  min-height: calc(100vh - 100px);
`;

const FormContainer = styled.div`
  width: 350px;
  box-shadow: ${boxShadow};
  border-radius: ${borderRadius};
  padding: 2rem;
  background: ${white};

  h3,
  p {
    text-align: center;
  }

  button[type='submit'] {
    line-height: 20px;
  }
`;
