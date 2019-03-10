import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledInput = styled.input`
  background: hsla(0, 0%, 100%, 0.25);
  border: 1px solid transparent;
  padding: 0 10px;
  border-radius: 3px;
  width: 100%;
  outline: 0 none;
  opacity: 0.8;
  min-height: 36px;
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 0.4px;
  color: white;
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
