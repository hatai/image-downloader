import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import color from '../utils/colors'

const div = styled.div`
  display: block;

  *,
  :after,
  :before {
    box-sizing: inherit;
  }
`;

const AppCover = styled.div`
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: auto;
  min-height: 0;
  background-position: bottom;
  z-index: 100;
  box-shadow: 0 0 25px 5px #000;
  transition: box-shadow 0.4s;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-size: cover;
  // TODO: デザイン
  //background-color: #171544;
  background-color: #ffffff;
  padding-top: 13px;
  padding-bottom: 13px;
  width: 100%;

  @media (max-width: 899px) {
    background-position: 0;
  }
`;
/*

const Background = styled(div)`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 0;
  overflow: hidden!important;
`
*/

/*
const Canvas = styled.canvas`
  display: inline-block;
`
*/

const Menu = styled(div)`
  height: 36px;
  //width: 260px;
  //min-width: 405px;
  width: 90vw;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

export default class Header extends Component {
  static propTypes = {
    onToggleCheckbox: PropTypes.func,
    onClickDownloadButton: PropTypes.func
  };
  // static defaultProps = {}

  render() {
    const { onToggleCheckbox, onClickDownloadButton } = this.props;

    return (
      <AppCover>
        <Menu>
          <div onClick={onToggleCheckbox}>check all</div>
          <div onClick={onClickDownloadButton}>download</div>
          <div>options</div>
        </Menu>
      </AppCover>
    );
  }
}
