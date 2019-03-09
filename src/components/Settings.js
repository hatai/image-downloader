import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Checkbox from './common/Checkbox';
import Range from './rc-slider/Range';
import color from '../utils/colors';

const Container = styled.div`
  width: 100%;
  height: 100%;
  background: ${color.voyagerDarkGrey};
  color: ${color.white};
  user-select: none;
`;

const Content = styled.div``;

const Flexbox = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: flex-start;
  align-items: center;
  align-content: center;
`;

const Vertical = styled(Flexbox)`
  flex-direction: column;
  align-items: flex-start;
`;

const Horizontal = styled(Flexbox)`
  flex-direction: row;
`;

const StyledInput = styled.input``;

const SmallLabel = styled.span`
  color: ${color.battleshipGrey};
  font-size: 0.6rem;
`;

const Settings = observer(
  class Settings extends Component {
    static propTypes = {
      id: PropTypes.string,
      settingsModel: PropTypes.object.isRequired
    };

    static defaultProps = {
      id: null
    };

    constructor(props) {
      super(props);

      this.state = {
        checked: false
      };
    }

    render() {
      const { id, settingsModel } = this.props;
      const {
        subFolder,
        filter,
        filterType,
        onlyImagesFromLink,
        minWidth,
        minWidthEnabled,
        maxWidth,
        maxWidthEnabled,
        minHeight,
        minHeightEnabled,
        maxHeight,
        maxHeightEnabled
      } = settingsModel;
      // const {} = this.state;

      return (
        <Container id={id}>
          <Content>
            <Vertical>
              Save to subfolder
              <StyledInput />
            </Vertical>
          </Content>

          <Content>
            <Vertical>
              Filter by URL
              <StyledInput />
            </Vertical>
          </Content>

          <Content>
            <Horizontal>
              Width
              <Checkbox
                checked={minWidthEnabled}
                onClick={() => {
                  settingsModel.minWidthEnabled = !minWidthEnabled;
                }}
              />
              <SmallLabel>{minWidth}</SmallLabel>
              <Range
                min={0}
                max={3000}
                defaultValue={[minWidth, maxWidth]}
                value={[minWidth, maxWidth]}
                count={1}
                allowCross={false}
                disabled={[!minWidthEnabled, !maxWidthEnabled]}
                onChange={this.handleOnChangeWidth}
              />
              <SmallLabel>{maxWidth}</SmallLabel>
              <Checkbox
                checked={maxWidthEnabled}
                onClick={() => {
                  settingsModel.maxWidthEnabled = !maxWidthEnabled;
                }}
              />
            </Horizontal>
          </Content>

          <Content>
            <Horizontal>
              Height
              <Checkbox
                checked={minHeightEnabled}
                onClick={() => {
                  settingsModel.minHeightEnabled = !minHeightEnabled;
                }}
              />
              <SmallLabel>{minHeight}</SmallLabel>
              <Range
                min={0}
                max={3000}
                defaultValue={[minHeight, maxHeight]}
                value={[minHeight, maxHeight]}
                count={1}
                allowCross={false}
                disabled={[!minHeightEnabled, !maxHeightEnabled]}
                onChange={this.handleOnChangeHeight}
              />
              <SmallLabel>{maxHeight}</SmallLabel>
              <Checkbox
                checked={maxHeightEnabled}
                onClick={() => {
                  settingsModel.maxHeightEnabled = !maxHeightEnabled;
                }}
              />
            </Horizontal>
          </Content>

          <Content
            onClick={() => {
              settingsModel.onlyImagesFromLink = !onlyImagesFromLink;
            }}
          >
            <Horizontal>
              <Checkbox checked={onlyImagesFromLink} />
              <span>Only images from links</span>
            </Horizontal>
          </Content>
        </Container>
      );
    }

    handleOnChangeWidth = ([min, max]) => {
      const { settingsModel } = this.props;
      settingsModel.minWidth = min;
      settingsModel.maxWidth = max;
    };

    handleOnChangeHeight = ([min, max]) => {
      const { settingsModel } = this.props;
      settingsModel.minHeight = min;
      settingsModel.maxHeight = max;
    };
  }
);

export default Settings;
