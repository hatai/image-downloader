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
    [seventh] auto
    10px
    [eighth] auto
    10px
    [ninth] auto [tenth] auto;
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

const options = ['Normal', 'Wildcard', 'Regex'];

const Settings = ({id}) => {
  const {
    subfolder,
    filter,
    filterType,
    onlyImagesHasSameHostname,
    onlyImagesFromLink,
    minWidth,
    minWidthEnabled,
    maxWidth,
    maxWidthEnabled,
    minHeight,
    minHeightEnabled,
    maxHeight,
    maxHeightEnabled,
    excludeQueryImage
  } = settingsModel;

  function setSubfolderValue(e) {
    settingsModel.subfolder = e.target.value;
  };

  function setFilterType(selected, i) {
    settingsModel.filterType = i;
  };

  function setFilterValue(e){
    settingsModel.filter = e.target.value;
  };

  function setWidth([min, max]) {
    if (settingsModel.minWidthEnabled || settingsModel.maxWidthEnabled) {
      settingsModel.minWidth = min;
      settingsModel.maxWidth = max;
    }
  };

  function onClickMinWidth() {
    settingsModel.minWidthEnabled = !settingsModel.minWidthEnabled;
  };

  function onClickMaxWidth() {
    settingsModel.maxWidthEnabled = !settingsModel.maxWidthEnabled;
  };

  function setHeight([min, max]) {
    if (settingsModel.minHeightEnabled || settingsModel.maxHeightEnabled) {
      settingsModel.minHeight = min;
      settingsModel.maxHeight = max;
    }
  };

  function onClickMinHeight() {
    settingsModel.minHeightEnabled = !settingsModel.minHeightEnabled;
  };

  function onClickMaxHeight() {
    settingsModel.maxHeightEnabled = !settingsModel.maxHeightEnabled;
  };

  function setOnlyImagesHasSameHostname() {
    const { onlyImagesHasSameHostname } = settingsModel;
    settingsModel.onlyImagesHasSameHostname = !onlyImagesHasSameHostname;
  };

  function setOnlyImagesFromLinks() {
    const { onlyImagesFromLink } = settingsModel;
    settingsModel.onlyImagesFromLink = !onlyImagesFromLink;
  };

  function setExcludeQueryImage() {
    const { excludeQueryImage } = settingsModel;
    settingsModel.excludeQueryImage = !excludeQueryImage;
  };

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
            onChange={setSubfolderValue}
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
            options={options}
            active={options[filterType]}
            onClick={setFilterType}
          />
        </GridItem>
        <GridItem columnStart={15} columnEnd={'end'} rowStart={'forth'}>
          <TextInput
            placeholder={'filter value'}
            value={filter}
            onChange={setFilterValue}
          />
        </GridItem>

        <GridItem columnStart={'first'} columnEnd={7} rowStart={'fifth'}>
          <NormalLabel>Width</NormalLabel>
        </GridItem>
        <GridItem columnStart={8} columnEnd={10} rowStart={'fifth'}>
          <Checkbox
            checked={minWidthEnabled}
            onClick={onClickMinWidth}
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
            onChange={setWidth}
          />
        </GridItem>
        <GridItem columnStart={36} columnEnd={39} rowStart={'fifth'}>
          <SmallLabel align={'left'}>{maxWidth}</SmallLabel>
        </GridItem>
        <GridItem columnStart={39} columnEnd={'end'} rowStart={'fifth'}>
          <Checkbox
            checked={maxWidthEnabled}
            onClick={onClickMaxWidth}
          />
        </GridItem>

        <GridItem columnStart={'first'} columnEnd={7} rowStart={'sixth'}>
          <NormalLabel>Height</NormalLabel>
        </GridItem>
        <GridItem columnStart={8} columnEnd={10} rowStart={'sixth'}>
          <Checkbox
            checked={minHeightEnabled}
            onClick={onClickMinHeight}
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
            onChange={setHeight}
          />
        </GridItem>
        <GridItem columnStart={36} columnEnd={39} rowStart={'sixth'}>
          <SmallLabel align={'left'}>{maxHeight}</SmallLabel>
        </GridItem>
        <GridItem columnStart={39} columnEnd={'end'} rowStart={'sixth'}>
          <Checkbox
            checked={maxHeightEnabled}
            onClick={onClickMaxHeight}
          />
        </GridItem>

        <GridItem
          columnStart={1}
          columnEnd={3}
          rowStart={'seventh'}
          onClick={setOnlyImagesHasSameHostname}
        >
          <Checkbox checked={onlyImagesHasSameHostname} />
        </GridItem>
        <GridItem
          columnStart={4}
          columnEnd={'end'}
          rowStart={'seventh'}
          onClick={setOnlyImagesHasSameHostname}
        >
          <NormalLabel>Only images has same hostname</NormalLabel>
        </GridItem>

        <GridItem
          columnStart={1}
          columnEnd={3}
          rowStart={'eighth'}
          onClick={setOnlyImagesFromLinks}
        >
          <Checkbox checked={onlyImagesFromLink} />
        </GridItem>
        <GridItem
          columnStart={4}
          columnEnd={'end'}
          rowStart={'eighth'}
          onClick={setOnlyImagesFromLinks}
        >
          <NormalLabel>Only images from links</NormalLabel>
        </GridItem>

        <GridItem
          columnStart={1}
          columnEnd={3}
          rowStart={'ninth'}
          onClick={setExcludeQueryImage}
        >
          <Checkbox checked={excludeQueryImage} />
        </GridItem>
        <GridItem
          columnStart={4}
          columnEnd={'end'}
          rowStart={'ninth'}
          onClick={setExcludeQueryImage}
        >
          <NormalLabel>Exclude images with query params</NormalLabel>
        </GridItem>
        <GridItem columnStart={4} columnEnd={'end'} rowStart={'tenth'}>
          <SmallLabel>
            ex.
            https//example.com/search?imageURL=https://example.com/example.jpg
          </SmallLabel>
        </GridItem>
      </Grid>
    </Container>
  );
}

Settings.propTypes = {
  id: PropTypes.string
}

Settings.defaultProps = {
  id: null
};

export default observer(Settings)
