import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid from 'uuid/v4';
import Icon from '@mdi/react';
import { mdiCloudDownloadOutline, mdiSettingsOutline } from '@mdi/js';
import swal from 'sweetalert2';
import Checkbox from './common/Checkbox';
import Settings from './Settings';
import color from '../utils/colors';
import imageListModel from '../models/image';
import settingsModel from '../models/settings';

const StyledDiv = styled.div`
  display: block;
  overflow: hidden;

  *,
  :after,
  :before {
    box-sizing: inherit;
  }
`;

const AppCover = styled(StyledDiv)`
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
  background-color: ${color.indigo};
  padding-top: 13px;
  padding-bottom: 13px;
  width: 100%;

  @media (max-width: 899px) {
    background-position: 0;
  }
`;
/*

const Background = styled(StyledDiv)`
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

const Menu = styled(StyledDiv)`
  height: 36px;
  //width: 260px;
  //min-width: 405px;
  width: 90vw;
  bottom: 0;
  display: flex;
  justify-content: space-between;
  position: relative;
`;

const Action = styled(StyledDiv)`
  user-select: none;
  cursor: pointer;
  width: auto;
  color: ${color.white};
  text-align: right;
  vertical-align: center;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;

  :hover {
    color: ${color.coolGrey};
  }

  p {
    margin: auto auto auto 5px;
    font-size: 1.25rem;
  }
`;

export default class Header extends Component {
  static propTypes = {
    imageListModel: PropTypes.object,
    settingsModel: PropTypes.object,
    onToggleCheckbox: PropTypes.func,
    onClickDownloadButton: PropTypes.func
  };

  static defaultProps = {
    onToggleCheckbox: () => {},
    onClickDownloadButton: () => {}
  };

  constructor(props) {
    super(props);

    this.state = {
      checkboxIconColor: color.orionGreen,
      downloadIconColor: color.orionGreen,
      settingsIconColor: color.orionGreen
    };
  }

  render() {
    const {
      checkboxIconColor,
      downloadIconColor,
      settingsIconColor
    } = this.state;
    const {
      settingsModel,
      onToggleCheckbox,
      onClickDownloadButton
    } = this.props;

    return (
      <AppCover>
        <Menu>
          <Action
            onClick={onToggleCheckbox}
            onMouseOver={() => this.handleOnMouseOver('checkboxIconColor')}
            onMouseLeave={() => this.handleOnMouseLeave('checkboxIconColor')}
          >
            <Checkbox
              checked={imageListModel.isCheckedAll}
              indeterminate={imageListModel.isIndeterminate}
              color={checkboxIconColor}
              size={'2em'}
            />
            <p>
              Check all{' '}
              {`(${imageListModel.checkedImages.length}/${
                imageListModel.images.length
              })`}
            </p>
          </Action>

          <Action
            onClick={onClickDownloadButton}
            onMouseOver={() => this.handleOnMouseOver('downloadIconColor')}
            onMouseLeave={() => this.handleOnMouseLeave('downloadIconColor')}
          >
            <Icon
              path={mdiCloudDownloadOutline}
              color={downloadIconColor}
              size={'2em'}
            />
            <p>Download checked images</p>
          </Action>

          <Action
            onClick={this.showSettings}
            onMouseOver={() => this.handleOnMouseOver('settingsIconColor')}
            onMouseLeave={() => this.handleOnMouseLeave('settingsIconColor')}
          >
            <Icon
              path={mdiSettingsOutline}
              color={settingsIconColor}
              size={'2em'}
            />
            <p>Settings</p>
          </Action>
        </Menu>
      </AppCover>
    );
  }

  showSettings = () => {
    const id = uuid();
    swal.fire({
      titleText: 'Settings',
      html: `<div id="${id}"></div>`,
      background: `${color.voyagerDarkGrey}`,
      showCloseButton: true,
      showConfirmButton: false,
      onOpen: () => {
        ReactDOM.render(
          <Settings settingsModel={settingsModel} />,
          document.getElementById(id)
        );
      }
    });
  };

  handleOnMouseOver = type => {
    this.setState({ [type]: color.darkMintGreen });
  };

  handleOnMouseLeave = type => {
    this.setState({ [type]: color.orionGreen });
  };
}
