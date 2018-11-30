import { observable, computed, action, decorate } from 'mobx'
import { saveOptions } from '../utils/index'

class OptionModel {
  subFolder
  filter
  // filterType 0: normal, 1: wildcard, 2: regex
   filterType
   minWidth
   minWidthEnabled
   maxWidth
   maxWidthEnabled
   minHeight
   minHeightEnabled
   maxHeight
   maxHeightEnabled
   onlyImagesFromLinks

  constructor () {
    this.subFolder = ''
    this.filter = ''
    this.filterType = 0
    this.minWidth = 0
    this.minWidthEnabled = false
    this.maxWidth = 3000
    this.maxWidthEnabled = false
    this.minHeight = 0
    this.minHeightEnabled = false
    this.maxHeight = 3000
    this.maxWidthEnabled = false
    this.onlyImagesFromLinks = false
  }

  /********************************************************************
   * Computed
   ********************************************************************/

  get values () {
    const {
      subFolder, filter, filterType, onlyImagesFromLinks,
      minWidth, minWidthEnabled, maxWidth, maxWidthEnabled,
      minHeight, minHeightEnabled, maxHeight, maxHeightEnabled,
    } = this

    return {
      subFolder, filter, filterType, onlyImagesFromLinks,
      minWidth, minWidthEnabled, maxWidth, maxWidthEnabled,
      minHeight, minHeightEnabled, maxHeight, maxHeightEnabled,
    }
  }

  set values (values) {
    if (values === null) {
      return
    }

    Object.keys(values).forEach(key => this[key] = values[key])
  }

  /********************************************************************
   * Action
   ********************************************************************/

  saveOptionsToLocalStorage () {
    saveOptions({key: 'options', value: Object.assign({}, this.values)})
      .catch(error => {
        console.log(error)
        // eslint-disable-next-line no-undef
        chrome.storage.local.clear()
      })
  }
}

decorate(OptionModel, {
  // observable
  subFolder: observable,
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
  onlyImagesFromLinks: observable,
  // computed
  values: computed,
  // action
  saveOptionsToLocalStorage: action.bound,
})

const optionModel = new OptionModel()
export default optionModel