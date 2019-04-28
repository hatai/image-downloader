/* eslint-env webextensions */
import { action, computed, decorate, observable } from 'mobx';
import { getSavedOptions } from '../utils/index';
import { KEY } from '../utils/constants';

const isValid = value => value !== undefined && value !== null;

class SettingsModel {
  subfolder = '';
  filter = '';
  // filterType 0: normal, 1: wildcard, 2: regex
  filterType = 0;
  minWidth = 0;
  minWidthEnabled = false;
  maxWidth = 3000;
  maxWidthEnabled = false;
  minHeight = 0;
  minHeightEnabled = false;
  maxHeight = 3000;
  maxHeightEnabled = false;
  onlyImagesHasSameHostname = false;
  onlyImagesFromLink = false;
  excludeQueryImage = true;

  get midWidth() {
    return (this.minWidth + this.maxWidth) / 2;
  }

  get midHeight() {
    return (this.minHeight + this.maxHeight) / 2;
  }

  get values() {
    return {
      subfolder: this.subfolder,
      filter: this.filter,
      filterType: this.filterType,
      minWidth: this.minWidth,
      minWidthEnabled: this.minWidthEnabled,
      maxWidth: this.maxWidth,
      maxWidthEnabled: this.maxWidthEnabled,
      minHeight: this.minHeight,
      minHeightEnabled: this.minHeightEnabled,
      maxHeight: this.maxHeight,
      maxHeightEnabled: this.maxHeightEnabled,
      onlyImagesHasSameHostname: this.onlyImagesHasSameHostname,
      onlyImagesFromLink: this.onlyImagesFromLink,
      excludeQueryImage: this.excludeQueryImage
    };
  }

  set values(values) {
    const {
      subfolder,
      filter,
      filterType,
      minWidth,
      minWidthEnabled,
      maxWidth,
      maxWidthEnabled,
      minHeight,
      minHeightEnabled,
      maxHeight,
      maxHeightEnabled,
      onlyImagesHasSameHostname,
      onlyImagesFromLink,
      excludeQueryImage
    } = values;

    this.subfolder = isValid(subfolder) ? subfolder : '';
    this.filter = isValid(filter) ? filter : '';
    this.filterType = isValid(filterType) ? filterType : 0;
    this.minWidth = isValid(minWidth) ? minWidth : 0;
    this.minWidthEnabled = isValid(minWidthEnabled) ? minWidthEnabled : false;
    this.maxWidth = isValid(maxWidth) ? maxWidth : 3000;
    this.maxWidthEnabled = isValid(maxWidthEnabled) ? maxWidthEnabled : false;
    this.minHeight = isValid(minHeight) ? minHeight : 0;
    this.minHeightEnabled = isValid(minHeightEnabled)
      ? minHeightEnabled
      : false;
    this.maxHeight = isValid(maxHeight) ? maxHeight : 3000;
    this.maxHeightEnabled = isValid(maxHeightEnabled)
      ? maxHeightEnabled
      : false;
    this.onlyImagesHasSameHostname = isValid(onlyImagesHasSameHostname)
      ? onlyImagesHasSameHostname
      : false;
    this.onlyImagesFromLink = isValid(onlyImagesFromLink)
      ? onlyImagesFromLink
      : false;
    this.excludeQueryImage = isValid(excludeQueryImage)
      ? excludeQueryImage
      : false;
  }

  /********************************************************************
   * Action
   ********************************************************************/

  applySettingsFromLocalStorage() {
    getSavedOptions(KEY).then(settings => {
      if (settings === null) {
        return;
      }

      this.values = settings;
    });
  }
}

decorate(SettingsModel, {
  // observable
  subfolder: observable,
  filter: observable,
  filterType: observable,
  minWidth: observable,
  minWidthEnabled: observable,
  maxWidth: observable,
  maxWidthEnabled: observable,
  minHeight: observable,
  minHeightEnabled: observable,
  maxHeight: observable,
  maxHeightEnabled: observable,
  onlyImagesHasSameHostname: observable,
  onlyImagesFromLink: observable,
  excludeQueryImage: observable,
  // computed
  midWidth: computed,
  midHeight: computed,
  values: computed,
  // action
  applySettingsFromLocalStorage: action.bound
});

const settingsModel = new SettingsModel();
export default settingsModel;
