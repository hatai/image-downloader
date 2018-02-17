import React, { Component } from 'react'
import PropTypes from 'prop-types'
import uuid from 'uuid/v4'
import '../assets/style/InputCheckbox.css'

class InputCheckbox extends Component {
  static defaultProps = {
    labelPosition: 'right',
    checked: false,
    isHandleDisabled: false,
    style: null,
  }

  constructor (props) {
    super(props)

    this.state = {
      id: uuid(),
    }

    this._renderInputGroup = this._renderInputGroup.bind(this)
    this._renderCheckbox = this._renderCheckbox.bind(this)
    this._handleOnClick = this._handleOnClick.bind(this)
  }

  render () {
    const {state} = this
    return (
      <div className={'field'}>
        <div className={'control'}>
          <label
            className={'checkbox'}
            htmlFor={state.id}
          >
            {this._renderInputGroup()}
          </label>
        </div>
      </div>
    )
  }

  _renderInputGroup () {
    const {props} = this
    let disabledClass = ''
    if (props.isHandleDisabled) {
      if (!props.checked)
        disabledClass = 'disabled'
    }

    if (props.labelPosition === 'left') {
      return (
        <span>
          <span className={`checkbox-label__left ${disabledClass}`} style={props.style}>
            {this.props.label}
          </span>
          {this._renderCheckbox()}
        </span>
      )
    } else {
      return (
        <span>
          {this._renderCheckbox()}
          <span className={`checkbox-label__right ${disabledClass}`} style={props.style}>
            {this.props.label}
          </span>
        </span>
      )
    }
  }

  _renderCheckbox () {
    const {state} = this
    return (
      <input
        id={state.id}
        type={'checkbox'}
        checked={this.props.checked}
        onClick={this._handleOnClick}
      />
    )
  }

  async _handleOnClick (event) {
    const {props} = this
    props.onClick(event, !props.checked)
  }
}

InputCheckbox.propTypes = {
  label: PropTypes.string.isRequired,
  labelPosition: PropTypes.oneOf(['left', 'right']),
  onClick: PropTypes.func.isRequired,
  checked: PropTypes.bool,
  isHandleDisabled: PropTypes.bool,
  style: PropTypes.any,
}


export default InputCheckbox
