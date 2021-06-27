import { useState } from 'react'
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import {v4 as uuid} from 'uuid';
import Icon from '@mdi/react';
import { mdiCloudDownloadOutline, mdiSettingsOutline } from '@mdi/js';
import Swal from 'sweetalert2';
import Checkbox from './common/Checkbox';
import Progressbar from './common/Progressbar';
import Settings from './Settings';
import imageListModel from '../models/image';
import settingsModel from '../models/settings';
import color from '../utils/colors';

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

function showSettings() {
  const id = uuid();
  Swal.fire({
    titleText: 'Settings',
    html: `<div id="${id}"></div>`,
    background: `${color.voyagerDarkGrey}`,
    showCloseButton: true,
    showConfirmButton: false,
    willOpen: () => {
      ReactDOM.render(
        <Settings settingsModel={settingsModel} />,
        document.getElementById(id)
      );
    }
  });
};

const Header = ({
  onToggleCheckbox,
  onClickDownloadButton
}) => {
  const [iconColor, setIconColor] = useState({
    checkbox: color.orionGreen,
    download: color.orionGreen,
    settings: color.orionGreen
  })

  const {
    isCheckedAll,
    isIndeterminate,
    images,
    checkedImages,
    progress
  } = imageListModel;

  function handleOnMouseOver(type) {
    setIconColor((state) => ({
      ...state,
      [type]: color.darkMintGreen
    }))
  }

  function handleOnMouseLeave(type) {
    setIconColor((state) => ({
      ...state,
      [type]: color.orionGreen
    }))
  }

  return (
    <AppCover>
      <Menu>
        <Action
          start={'check'}
          end={'check'}
          onClick={onToggleCheckbox}
          onMouseOver={() => handleOnMouseOver('checkbox')}
          onMouseLeave={() => handleOnMouseLeave('checkbox')}
        >
          <Checkbox
            checked={isCheckedAll}
            indeterminate={isIndeterminate}
            color={iconColor.checkbox}
            size={'2em'}
          />
          <p>{`Check all (${checkedImages.length}/${images.length})`}</p>
        </Action>

        <Action
          start={'download'}
          end={'download'}
          onClick={onClickDownloadButton}
          onMouseOver={() => handleOnMouseOver('download')}
          onMouseLeave={() => handleOnMouseLeave('download')}
        >
          <Icon
            path={mdiCloudDownloadOutline}
            color={iconColor.download}
            size={'2em'}
          />
          <p>Download checked images</p>
        </Action>

        <Action
          start={'setting'}
          end={'setting'}
          onClick={showSettings}
          onMouseOver={() => handleOnMouseOver('settings')}
          onMouseLeave={() => handleOnMouseLeave('settings')}
        >
          <Icon
            path={mdiSettingsOutline}
            color={iconColor.settings}
            size={'2em'}
          />
          <p>Settings</p>
        </Action>
      </Menu>

      <Progressbar width={progress} />
    </AppCover>
  );
}

Header.propTypes = {
  onToggleCheckbox: PropTypes.func,
  onClickDownloadButton: PropTypes.func
};

Header.defaultProps = {
  onToggleCheckbox: () => {},
  onClickDownloadButton: () => {}
}

export default observer(Header)
