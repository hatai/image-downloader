import React, { Component } from 'react';
import PropTypes from 'prop-types';

class InputText extends Component {
  render () {
    const {props} = this

    return (
      <div className="field">
        <label className="label">{props.label}</label>
        <div className="control is-expand">
          <input
            className='input is-small'
            type="text"
            placeholder={props.placeholder}
            onChange={props.onChange}
          />
        </div>
      </div>
    );
  }
}

InputText.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

export default InputText;
