import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Button extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onClick: PropTypes.func,
    disabled: PropTypes.bool,
    primary: PropTypes.bool,
    link: PropTypes.bool,
    info: PropTypes.bool,
    success: PropTypes.bool,
    warning: PropTypes.bool,
    danger: PropTypes.bool,
  }

  static defaultProps = {
    primary: false,
    link: false,
    info: false,
    success: false,
    warning: false,
    danger: false,
    disabled: false,
  }

  render () {
    const buttonColor = this.getButtonColor()

    return (
      <div className={"field"}>
        <div className={"control"}>
          <a
            className={`button ${buttonColor}`}
            onClick={this.props.onClick}
            disabled={this.props.disabled}
          >
            {this.props.children}
            <span>{this.props.title}</span>
          </a>
        </div>
      </div>
    );
  }

  getButtonColor() {
    const {primary, link, info, success, warning, danger} = this.props

    switch (true) {
      case primary:
        return 'is-primary'

      case link:
        return 'is-link'

      case info:
        return 'is-info'

      case success:
        return 'is-success'

      case warning:
        return 'is-warning'

      case danger:
        return 'is-danger'

      default:
        return ''
    }
  }
}
