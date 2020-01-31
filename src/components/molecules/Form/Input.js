import React from 'react';
import PropTypes from 'prop-types';
import {
  InputGroupStyled,
  InputStyled,
  LabelStyled,
  SmallStyled
} from '../../atom';

export const Input = (props) => {
  const {
    type,
    inputChange,
    error,
    labelText,
    name,
    value,
    placeholder
  } = props;

  const handleInputChange = (evt) => {
    const field = evt.target.name;
    const value = evt.target.value;

    inputChange(field, value);
  };

  return (
    <InputGroupStyled>
      <LabelStyled>{labelText ? labelText : ''}</LabelStyled>
      <InputStyled
        type={type}
        onChange={handleInputChange}
        name={name}
        value={value}
        placeholder={placeholder}
      />
      <SmallStyled>{error || ''}</SmallStyled>
    </InputGroupStyled>
  );
};

Input.propTypes = {
  type: PropTypes.string,
  inputChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  labelText: PropTypes.string,
  value: PropTypes.any
};

Input.defaultProps = {
  name: ''
};
