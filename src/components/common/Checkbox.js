import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Icon from '@mdi/react';
import {
  mdiCheckboxBlankOutline,
  mdiCheckboxMarkedOutline,
  mdiMinusBoxOutline
} from '@mdi/js';
import color from '../../utils/colors';

const Container = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
`;

export default class Checkbox extends Component {
  static propTypes = {
    checked: PropTypes.bool,
    indeterminate: PropTypes.bool,
    size: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
  };

  static defaultProps = {
    checked: false,
    indeterminate: false,
    size: '22px',
    color: color.orionGreen,
    onClick: () => {}
  };

  render() {
    const { size, color, onClick } = this.props;
    return (
      <Container onClick={onClick}>
        <Icon path={this.getIcon()} color={color} size={size} />
      </Container>
    );
  }

  getIcon = () => {
    const { checked, indeterminate } = this.props;
    if (indeterminate) {
      return mdiMinusBoxOutline;
    }

    if (checked) {
      return mdiCheckboxMarkedOutline;
    }

    return mdiCheckboxBlankOutline;
  };
}
