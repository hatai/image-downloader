import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Icon extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired
  }

  render () {
    return (
      <span className={"icon"}>
        <i className={this.props.name}/>
      </span>
    );
  }
}
