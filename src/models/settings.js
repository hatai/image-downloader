import { observable, action, decorate } from 'mobx';
import { saveOptions } from '../utils/index';

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
  onlyImagesFromLink = false;

  /********************************************************************
   * Action
   ********************************************************************/

  saveOptionsToLocalStorage() {
    saveOptions({
      key: 'options',
      value: Object.assign({}, this.values)
    }).catch(error => {
      console.log(error);
      // eslint-disable-next-line no-undef
      chrome.storage.local.clear();
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
  onlyImagesFromLink: observable,
  // action
  saveOptionsToLocalStorage: action.bound
});

const settingsModel = new SettingsModel();
export default settingsModel;
