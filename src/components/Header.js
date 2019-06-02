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
import imageListModel from '../models/image';
import settingsModel from '../models/settings';
import color from '../utils/colors';
import { observer } from 'mobx-react';
import Progressbar from './common/Progressbar';

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
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //justify-content: space-between;
  background-size: cover;
  background-color: ${color.indigo};
  padding-top: 13px;
  padding-bottom: 13px;
  width: 100%;

  @media (max-width: 899px) {
    background-position: 0;
  }
`;

const Menu = styled(StyledDiv)`
  height: 36px;
  //width: 260px;
  //min-width: 405px;
  width: 90vw;
  margin-left: 5vw;
  margin-right: 5vw;
  bottom: 0;
  justify-content: space-between;
  position: relative;

  display: grid;
  grid-template-columns: [check] 28% [download] auto [setting] 20%;
  grid-template-rows: auto;
`;

const Action = styled(StyledDiv)`
  user-select: none;
  cursor: pointer;
  width: auto;
  color: ${color.white};

  grid-column-start: ${props => props.start || 'auto'};
  grid-column-end: ${props => props.end || 'auto'};
  grid-row-start: auto;
  grid-row-end: auto;

  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-content: center;
  align-items: center;

  :hover {
    color: ${color.coolGrey};
  }

  p {
    margin: auto auto auto 5px;
    font-size: 1.25rem;
    font-weight: 400;
  }
`;

export default observer(
  class Header extends Component {
    static propTypes = {
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

    render() {
      const {
        checkboxIconColor,
        downloadIconColor,
        settingsIconColor
      } = this.state;

      const { onToggleCheckbox, onClickDownloadButton } = this.props;

      const {
        isCheckedAll,
        isIndeterminate,
        images,
        checkedImages,
        progress
      } = imageListModel;

      return (
        <AppCover>
          <Menu>
            <Action
              start={'check'}
              end={'check'}
              onClick={onToggleCheckbox}
              onMouseOver={() => this.handleOnMouseOver('checkboxIconColor')}
              onMouseLeave={() => this.handleOnMouseLeave('checkboxIconColor')}
            >
              <Checkbox
                checked={isCheckedAll}
                indeterminate={isIndeterminate}
                color={checkboxIconColor}
                size={'2em'}
              />
              <p>{`Check all (${checkedImages.length}/${images.length})`}</p>
            </Action>

            <Action
              start={'download'}
              end={'download'}
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
              start={'setting'}
              end={'setting'}
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

          <Progressbar width={progress} />
        </AppCover>
      );
    }
  }
);
