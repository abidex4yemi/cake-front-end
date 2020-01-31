/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Input } from '../molecules';
import styled from 'styled-components';

export const SecurityQuestion = (props) => {
  const { questions, getData } = props;

  const [showInput, setShowInput] = useState(false);

  const [userSelection, setUserSelection] = useState({
    question: '',
    answer: ''
  });

  useEffect(() => {
    getData(userSelection);
  }, [userSelection]);

  const handleQuestionChange = (evt) => {
    const question = evt.target.value;

    setShowInput(true);

    setUserSelection((prevState) => ({
      ...prevState,
      question
    }));
  };

  const inputChange = (field, value) => {
    setUserSelection((prevState) => ({
      ...prevState,
      [field]: value
    }));
  };

  return (
    <StyledSelectContainer>
      <select onChange={handleQuestionChange}>
        <option>Choose question...</option>
        {questions.map((question) => (
          <option key={question} value={question}>
            {question}
          </option>
        ))}
      </select>

      {showInput && (
        <Input
          type="text"
          name="answer"
          inputChange={inputChange}
          value={userSelection.answer}
          placeholder="Answer..."
        />
      )}
    </StyledSelectContainer>
  );
};

const StyledSelectContainer = styled.div`
  select {
    background: linear-gradient(top, #f9f9f9, #e3e3e3);
    border: 1px solid #999;
    border-radius: 3px;
    width: 100%;
    height: 30px;
    line-height: 30px;
    outline: none;
    white-space: nowrap;
    -webkit-user-select: none;
    cursor: pointer;
    text-shadow: 1px 1px #fff;
    font-weight: 700;
    font-size: 10pt;
    margin: 10px 0;
  }

  option {
    font-weight: 700;
  }
`;
