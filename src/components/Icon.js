import React, { Component } from 'react'
import PropTypes from 'prop-types'

class Icon extends Component {
  render () {
    return (
      <span className={"icon"}>
        <i className={this.props.name}/>
      </span>
    );
  }
}

Icon.propTypes = {
  name: PropTypes.string.isRequired
};

export default Icon;
