import { observable, computed, action } from 'mobx'
import uuid from 'uuid/v1'

export class Image {
  id = uuid()
  @observable src = ''
  @observable width = 0
  @observable height = 0
  @observable linked = false
  @observable checked = false
  @observable visible = false
  @observable filtered = false

  constructor (src, linked = false) {
    this.src = src
    this.linked = linked
  }
}

export class Images {
  @observable images = []
  @observable sources = []

  constructor ({images, linkedImages}) {
    this.notLinkedImages = images
    this.linkedImages = linkedImages
  }

  /********************************************************************
   * Getter
   ********************************************************************/

  @computed get isCheckedAll () {
    return this.images.every(image => image.checked)
  }

  @computed get isUncheckedAll () {
    return this.images.every(image => !image.checked)
  }

  @computed get isIndeterminate () {
    return !this.isCheckedAll && !this.isUncheckedAll
  }

  @computed get checkedImages () {
    return this.images.filter(image => image.checked)
  }

  @computed get uncheckedImages () {
    return this.images.filter(image => !image.checked)
  }

  @computed get linkedImages () {
    return this.images.filter(image => image.linked)
  }

  @computed get notLinkedImages () {
    return this.images.filter(image => !image.linked)
  }

  /********************************************************************
   * Setter
   ********************************************************************/

  @computed set linkedImages (images) {
    this.sources = [].concat(this.sources, images.map(image => new Image(image, true)))
  }

  @computed set notLinkedImages (images) {
    this.sources = [].concat(this.sources, images.map(image => new Image(image, false)))
  }

  /********************************************************************
   * Action
   ********************************************************************/

  @action.bind remove () {
  }

  @action.bind check () {
  }

  @action.bind checkAll () {
    this.images = this.images.map(image => {
      image.checked = true
    })
  }

  @action.bind uncheckAll () {
    this.images = this.images.map(image => {
      image.checked = false
    })
  }

  @action.bind download () {
    this.checkedImages.forEach(async image => {
      chrome.downlods.download({url: image.src})
    })
  }

  @action.bind filterByNormal (filterValue) {
    if (filterValue === '' || filterValue === null) {
      // do not anything
      return
    }

    const terms = filterValue.split(' ')
    this.images = this.images.filter(data => {
      for (let i = 0; i < terms.length; i++) {
        let term = terms[i]

        if (term.length !== 0) {
          let expected = (term[0] !== '-')

          if (!expected) {
            term = term.substr(1)

            if (term.length === 0) {
              continue
            }
          }

          return (data.src.indexOf(term) !== -1) === expected
        }
      }

      // set visible
      return false
    })
  }

  @action.bind filterByWildCard (filterValue) {
    const newFilterValue = filterValue.replace(/([.^$[\]\\(){}|-])/g, '\\$1').replace(/([?*+])/, '.$1')

    this.images = this.images.filter(data => {
      try {
        return data.src.match(newFilterValue)

      } catch (e) {
        // set not visible
        return false
      }
    })
  }

  @action.bind filterByRegex (filterValue) {
    this.images = this.images.filter(data => {
      try {
        return data.src.match(filterValue)

      } catch (e) {
        // set not visible
        return false
      }
    })
  }

  @action.bind filterByImageSize (option) {
    this.images = this.images.filter(image => Images.shouldFilterBySize(image, option))
  }

  @action.bind filterByLinkedImage (onlyImagesFromLinks) {
    if (onlyImagesFromLinks) {
      this.images = this.sources
        .filter(image => image.visible && image.linked)
    }
    else {
      this.images = this.sources.filter(image => image.visible)
    }
  }

  /**
   * whether to filter or not
   * @param image
   * @param option
   * @returns {boolean}
   */
  static shouldFilterBySize (image, option) {
    const minWidthIsOk = option.minWidthEnabled === false
      || (option.minWidthEnabled && image.width >= option.minWidth)

    const maxWidthIsOk = option.maxWidthEnabled === false
      || (option.maxWidthEnabled && image.width <= option.maxWidth)

    const minHeightIsOk = option.minHeightEnabled === false
      || (option.minHeightEnabled && image.height >= option.minHeight)

    const maxHeightIsOk = option.maxHeightEnabled === false
      || (option.maxHeightEnabled && image.height <= option.maxHeight)

    return minWidthIsOk && maxWidthIsOk && minHeightIsOk && maxHeightIsOk
  }
}