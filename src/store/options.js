import { observable, computed, action } from 'mobx'
import { saveOptions } from '../utils/index'

export class Options {
  @observable subFolder = ''
  @observable filter = ''
  // filterType 0: normal, 1: wildcard, 2: regex
  @observable filterType = 0
  @observable minWidth = 0
  @observable minWidthEnabled = false
  @observable maxWidth = 3000
  @observable maxWidthEnabled = false
  @observable minHeight = 0
  @observable minHeightEnabled = false
  @observable maxHeight = 3000
  @observable maxHeightEnabled = false
  @observable onlyImagesFromLinks = false

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

  @action.bind saveOptionsToLocalStorage () {
    saveOptions({key: 'options', value: Object.assign({}, this.values)})
      .catch(error => {
        console.log(error)
        // eslint-disable-next-line no-undef
        chrome.storage.local.clear()
      })
  }
}