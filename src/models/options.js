import { observable, computed, action } from 'mobx'
import { saveOptions } from '../utils/index'

export default class OptionsModel {
  @observable subFolder
  @observable filter
  // filterType 0: normal, 1: wildcard, 2: regex
  @observable filterType
  @observable minWidth
  @observable minWidthEnabled
  @observable maxWidth
  @observable maxWidthEnabled
  @observable minHeight
  @observable minHeightEnabled
  @observable maxHeight
  @observable maxHeightEnabled
  @observable onlyImagesFromLinks

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

  @computed get values () {
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

  @computed set values (values) {
    if (values === null) {
      return
    }

    Object.keys(values).forEach(key => this[key] = values[key])
  }

  @action.bound
  saveOptionsToLocalStorage () {
    saveOptions({key: 'options', value: Object.assign({}, this.values)})
      .catch(error => {
        console.log(error)
        // eslint-disable-next-line no-undef
        chrome.storage.local.clear()
      })
  }
}