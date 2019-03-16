import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import Checkbox from './common/Checkbox';
import DropDown from './common/DropDown';
import TextInput from './common/TextInput';
import Range from './rc-slider/Range';
import settingsModel from '../models/settings';
import color from '../utils/colors';

const Container = styled.div`
  width: auto;
  height: 100%;
  display: inline-block;
  text-align: center;
  background: ${color.voyagerDarkGrey};
  color: ${color.white};
  user-select: none;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: [first] 10px repeat(40, 10px) [end] 10px;
  grid-template-rows:
    [first] auto [second] auto
    10px
    [third] auto [forth] auto
    10px
    [fifth] auto
    10px
    [sixth] auto
    10px
    [seventh] auto;
`;

const GridItem = styled.div`
  grid-column-start: ${props => props.columnStart || 'auto'};
  grid-column-end: ${props => props.columnEnd || 'auto'};
  grid-row-start: ${props => props.rowStart || 'auto'};
  grid-row-end: ${props => props.rowEnd || 'auto'};
  // vertical align: center
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const NormalLabel = styled.div`
  font-size: 18px;
  font-weight: 800;
`;

const SmallLabel = styled.div`
  width: 100%;
  color: ${color.battleshipGrey};
  text-align: ${props => props.align || 'left'};
  font-size: 0.6rem;
`;

export default observer(
  class Settings extends Component {
    static propTypes = {
      id: PropTypes.string
    };

    static defaultProps = {
      id: null
    };

    constructor(props) {
      super(props);

      this.options = ['Normal', 'Wildcard', 'Regex'];
    }

    setSubfolderValue = e => {
      settingsModel.subfolder = e.target.value;
    };

    setFilterType = (selected, i) => {
      settingsModel.filterType = i;
    };

    setFilterValue = e => {
      settingsModel.filter = e.target.value;
    };

    setWidth = ([min, max]) => {
      if (settingsModel.minWidthEnabled || settingsModel.maxWidthEnabled) {
        settingsModel.minWidth = min;
        settingsModel.maxWidth = max;
      }
    };

    onClickMinWidth = () => {
      settingsModel.minWidthEnabled = !settingsModel.minWidthEnabled;
    };

    onClickMaxWidth = () => {
      settingsModel.maxWidthEnabled = !settingsModel.maxWidthEnabled;
    };

    setHeight = ([min, max]) => {
      if (settingsModel.minHeightEnabled || settingsModel.maxHeightEnabled) {
        settingsModel.minHeight = min;
        settingsModel.maxHeight = max;
      }
    };

    onClickMinHeight = () => {
      settingsModel.minHeightEnabled = !settingsModel.minHeightEnabled;
    };

    onClickMaxHeight = () => {
      settingsModel.maxHeightEnabled = !settingsModel.maxHeightEnabled;
    };

    setOnlyImagesFromLinks = () => {
      const { onlyImagesFromLink } = settingsModel;
      settingsModel.onlyImagesFromLink = !onlyImagesFromLink;
    };

    render() {
      const { id } = this.props;
      const {
        subfolder,
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

      return (
        <Container id={id}>
          <Grid>
            <GridItem
              columnStart={'first'}
              columnEnd={'end'}
              rowStart={'first'}
            >
              <NormalLabel>Save to Subfolder</NormalLabel>
            </GridItem>
            <GridItem
              columnStart={'first'}
              columnEnd={'end'}
              rowStart={'second'}
            >
              <TextInput
                placeholder={'subfolder path'}
                value={subfolder}
                onChange={this.setSubfolderValue}
              />
            </GridItem>

            <GridItem
              columnStart={'first'}
              columnEnd={'end'}
              rowStart={'third'}
            >
              <NormalLabel>Filter by URL</NormalLabel>
            </GridItem>
            <GridItem columnStart={'first'} columnEnd={14} rowStart={'forth'}>
              <DropDown
                options={this.options}
                active={this.options[filterType]}
                onClick={this.setFilterType}
              />
            </GridItem>
            <GridItem columnStart={15} columnEnd={'end'} rowStart={'forth'}>
              <TextInput
                placeholder={'filter value'}
                value={filter}
                onChange={this.setFilterValue}
              />
            </GridItem>

            <GridItem columnStart={'first'} columnEnd={7} rowStart={'fifth'}>
              <NormalLabel>Width</NormalLabel>
            </GridItem>
            <GridItem columnStart={8} columnEnd={10} rowStart={'fifth'}>
              <Checkbox
                checked={minWidthEnabled}
                onClick={this.onClickMinWidth}
              />
            </GridItem>
            <GridItem columnStart={10} columnEnd={13} rowStart={'fifth'}>
              <SmallLabel align={'right'}>{minWidth}</SmallLabel>
            </GridItem>
            <GridItem columnStart={14} columnEnd={35} rowStart={'fifth'}>
              <Range
                min={0}
                max={3000}
                defaultValue={[minWidth, maxWidth]}
                value={[minWidth, maxWidth]}
                count={1}
                allowCross={false}
                disabled={[!minWidthEnabled, !maxWidthEnabled]}
                onChange={this.setWidth}
              />
            </GridItem>
            <GridItem columnStart={36} columnEnd={39} rowStart={'fifth'}>
              <SmallLabel align={'left'}>{maxWidth}</SmallLabel>
            </GridItem>
            <GridItem columnStart={39} columnEnd={'end'} rowStart={'fifth'}>
              <Checkbox
                checked={maxWidthEnabled}
                onClick={this.onClickMaxWidth}
              />
            </GridItem>

            <GridItem columnStart={'first'} columnEnd={7} rowStart={'sixth'}>
              <NormalLabel>Height</NormalLabel>
            </GridItem>
            <GridItem columnStart={8} columnEnd={10} rowStart={'sixth'}>
              <Checkbox
                checked={minHeightEnabled}
                onClick={this.onClickMinHeight}
              />
            </GridItem>
            <GridItem columnStart={10} columnEnd={13} rowStart={'sixth'}>
              <SmallLabel align={'right'}>{minHeight}</SmallLabel>
            </GridItem>
            <GridItem columnStart={14} columnEnd={35} rowStart={'sixth'}>
              <Range
                min={0}
                max={3000}
                defaultValue={[minHeight, maxHeight]}
                value={[minHeight, maxHeight]}
                count={1}
                allowCross={false}
                disabled={[!minHeightEnabled, !maxHeightEnabled]}
                onChange={this.setHeight}
              />
            </GridItem>
            <GridItem columnStart={36} columnEnd={39} rowStart={'sixth'}>
              <SmallLabel align={'left'}>{maxHeight}</SmallLabel>
            </GridItem>
            <GridItem columnStart={39} columnEnd={'end'} rowStart={'sixth'}>
              <Checkbox
                checked={maxHeightEnabled}
                onClick={this.onClickMaxHeight}
              />
            </GridItem>

            <GridItem
              columnStart={1}
              columnEnd={3}
              rowStart={'seventh'}
              onClick={this.setOnlyImagesFromLinks}
            >
              <Checkbox checked={onlyImagesFromLink} />
            </GridItem>
            <GridItem
              columnStart={4}
              columnEnd={'end'}
              rowStart={'seventh'}
              onClick={this.setOnlyImagesFromLinks}
            >
              <NormalLabel>Only images from links</NormalLabel>
            </GridItem>
          </Grid>
        </Container>
      );
    }
  }
);
