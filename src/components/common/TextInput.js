import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  min-height: 36px;
  padding: 0 10px;
  background: hsla(0, 0%, 100%, 0.25);
  opacity: 0.8;
  border: 1px solid transparent;
  border-radius: 3px;
  outline: 0 none;
  color: white;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.4px;
  text-shadow: inherit;
  -webkit-text-fill-color: inherit;
`;

const TextInput = ({ placeholder, value, onChange }) => (
  <StyledInput
    type={'text'}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

TextInput.propTypes = {
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func
};

TextInput.defaultProps = {
  placeholder: 'text input',
  value: '',
  onChange: () => {}
};

export default TextInput;
