import { createContainer, createSagas } from 'redux-box'

export const mutationType = {
  SET_IMAGES: 'SET_IMAGES',
  SET_NOT_LINKED_IMAGES: 'SET_NOT_LINKED_IMAGES',
  SET_LINKED_IMAGES: 'SET_LINKED_IMAGES',
  REMOVE: 'REMOVE',
  CHECK: 'CHECK',
  CHECK_ALL: 'CHECK_ALL',
  UNCHECK_ALL: 'UNCHECK_ALL',
  IS_CHECKED_ALL: 'IS_CHECKED_ALL',
  DOWNLOAD_CHECKED: 'DOWNLOAD_CHECKED',
  SET_NATURAL_SIZE: 'SET_NATURAL_SIZE',
  SET_NATURAL_WIDTH: 'SET_NATURAL_WIDTH',
  SET_NATURAL_HEIGHT: 'SET_NATURAL_HEIGHT',
  RUN_FILTER: 'RUN_FILTER',
  FILTER_BY_TEXT: 'FILTER_BY_TEXT',
  FILTER_BY_NORMAL: 'FILTER_BY_NORMAL',
  FILTER_BY_WILDCARD: 'FILTER_BY_WILDCARD',
  FILTER_BY_REGEX: 'FILTER_BY_REGEX',
  FILTER_BY_SIZE: 'FILTER_BY_SIZE',
  FILTER_BY_LINKED_IMAGE: 'FILTER_BY_LINKED_IMAGE',
}

/**
 * @type {{
 *  checkedAll: boolean,
 *  images: *[{{
 *    src: string,
 *    width: number,
 *    height: number,
 *    linked: true,
 *    downloaded: boolean
 *  }}]
 * }}
 * @description if filtered is false not visible else if it is true visible
 */
const state = {
  checkedAll: false,
  images: [],
  sources: [],
  // sources: dummy,
}

const actions = {
  setImages: (images) => ({
    type: mutationType.SET_IMAGES,
    images
  }),

  setNotLinkedImages: (images) => ({
    type: mutationType.SET_NOT_LINKED_IMAGES,
    images
  }),

  setLinkedImages: (images) => ({
    type: mutationType.SET_LINKED_IMAGES,
    images
  }),

  remove: (index) => ({
    type: mutationType.REMOVE,
    index
  }),

  check: (index) => ({
    type: mutationType.CHECK,
    index
  }),

  checkAll: () => ({
    type: mutationType.CHECK_ALL
  }),

  isCheckedAll: () => ({
    type: mutationType.IS_CHECKED_ALL
  }),

  uncheckAll: () => ({
    type: mutationType.UNCHECK_ALL
  }),

  downloadChecked: () => ({
    type: mutationType.DOWNLOAD_CHECKED
  }),

  setNaturalSize: (index, width, height) => ({
    type: mutationType.SET_NATURAL_SIZE,
    index,
    width,
    height
  }),

  setNaturalWidth: (index, width) => ({
    type: mutationType.SET_NATURAL_WIDTH,
    index, width
  }),

  setNaturalHeight: (index, height) => ({
    type: mutationType.SET_NATURAL_HEIGHT,
    index,
    height
  }),

  runFilter: () => ({
    // handled by filter middleware
    type: mutationType.RUN_FILTER
  }),

  filterByNormal: async (filterValue) => ({
    type: mutationType.FILTER_BY_NORMAL,
    filterValue
  }),

  filterByWildcard: async (filterValue) => ({
    type: mutationType.FILTER_BY_WILDCARD,
    filterValue
  }),

  filterByRegex: async (filterValue) => ({
    type: mutationType.FILTER_BY_REGEX,
    filterValue
  }),

  filterBySize: async (option) => ({
    type: mutationType.FILTER_BY_SIZE,
    option
  }),

  filterByLinkedImage: async (onlyImagesFromLinks) => ({
    type: mutationType.FILTER_BY_LINKED_IMAGE,
    onlyImagesFromLinks,
  })
}

const mutations = {
  /**
   * set images
   * @param {Object} state
   * @param {Array} images
   * @constructor
   */
  SET_IMAGES: (state, {images}) => {
    let id = 0

    state.sources = [].concat(
      images.images.map(image => ({
        src: image,
        id: id++,
        width: 0,
        height: 0,
        linked: false,
        checked: false,
        visible: false,
      })),
      images.linkedImages.map(image => ({
        src: image,
        id: id++,
        width: 0,
        height: 0,
        linked: true,
        checked: false,
        visible: false,
      }))
    )
  },

  /**
   * set images
   * @param {Object} state
   * @param {Array} images
   * @constructor
   */
  SET_NOT_LINKED_IMAGES: (state, {images}) => {
    state.sources = [].concat(state.sources, images.map(image => ({
      src: image,
      width: 0,
      height: 0,
      linked: false,
      checked: false,
    })))
  },

  /**
   * set images
   * @param {Object} state
   * @param {Array} images
   * @constructor
   */
  SET_LINKED_IMAGES: (state, {images}) => {
    state.sources = [].concat(state.sources, images.map(image => ({
      src: image,
      width: 0,
      height: 0,
      linked: true,
      checked: false,
    })))
  },

  /**
   * remove element from array
   * @param state
   * @param index
   * @constructor
   */
  REMOVE: (state, {index}) => {
    // create deep copy
    const copy = state.sources.slice()
    // remove element
    copy.splice(index, 1)
    // set value
    state.sources = copy
  },

  /**
   * check a selected image
   * @param {Object} state
   * @param {Number} index
   * @constructor
   */
  CHECK: (state, {index}) => {
    const image = state.images[index]
    const sourceIndex = state.sources.map(image => image.id).indexOf(image.id)
    const source = state.sources[sourceIndex]

    // update status
    state.sources[sourceIndex] = Object.assign(source, {checked: !source.checked})
    state.images[index] = Object.assign(image, {checked: !image.checked})

    // check all images are checked
    state.checkedAll = state.images.filter(data => data.checked).length === state.images.length
  },

  /**
   * check all images
   * @param {Object} state
   * @constructor
   */
  CHECK_ALL: (state) => {
    const check = data => Object.assign(data, {checked: true})

    state.images = state.images.map(check)
    state.sources = state.sources.map(check)
    state.checkedAll = true
  },

  /**
   * uncheck all images
   * @param {Object} state
   * @constructor
   */
  UNCHECK_ALL: (state) => {
    const check = data => Object.assign(data, {checked: false})

    state.images = state.images.map(check)
    state.sources = state.sources.map(check)
    state.checkedAll = false
  },

  /**
   * check all image status is checked
   * @param state
   * @constructor
   */
  IS_CHECKED_ALL: (state) => {
    const len = state.images.filter(image => image.checked).length

    if (len === 0)
      state.checkedAll = false
    else
      state.checkedAll = len === state.images.length
  },

  /**
   * download all checked images
   * and if download success thant mark as downloaded
   * @param {Object} state
   * @constructor
   */
  DOWNLOAD_CHECKED: (state) => {
    state.images
      .filter(data => data.checked)
      .forEach(async data => {
        // download images from url
        chrome.downloads.download({url: data.src})
      })
  },

  /**
   * set natural width and height
   * @param state
   * @param action
   * @constructor
   */
  SET_NATURAL_SIZE: (state, {index, width, height}) => {
    state.sources[index] = Object.assign(state.sources[index], {width, height, visible: true})
  },

  /**
   * set natural width
   * @param state
   * @param action
   * @constructor
   */
  SET_NATURAL_WIDTH: (state, {index, width}) => {
    state.sources[index] = Object.assign(state.sources[index], {width})
  },

  /**
   * set natural height
   * @param state
   * @param action
   * @constructor
   */
  SET_NATURAL_HEIGHT: (state, {index, height}) => {
    state.sources[index] = Object.assign(state.sources[index], {height})
  },

  /**
   * filter images by string
   * Filter Priority: Second
   * @param state
   * @param action
   * @constructor
   */
  FILTER_BY_NORMAL: (state, {filterValue}) => {
    if (filterValue === '' || filterValue === null)
    // do not anything
      return

    const terms = filterValue.split(' ')
    state.images = state.images.filter(data => {
      for (let i = 0; i < terms.length; i++) {
        let term = terms[i]

        if (term.length !== 0) {
          let expected = (term[0] !== '-')

          if (!expected) {
            term = term.substr(1)

            if (term.length === 0)
              continue
          }

          return (data.src.indexOf(term) !== -1) === expected
        }
      }

      // set visible
      return false
    })
  },

  /**
   * filter images by string
   * Filter Priority: Second
   * @param state
   * @param action
   * @constructor
   */
  FILTER_BY_WILDCARD: (state, {filterValue}) => {
    const newFilterValue = filterValue.replace(/([.^$[\]\\(){}|-])/g, '\\$1').replace(/([?*+])/, '.$1')

    state.images = state.images.filter(data => {
      try {
        return data.src.match(newFilterValue)

      } catch (e) {
        // set not visible
        return false
      }
    })
  },

  /**
   * filter images by regexp
   * Filter Priority: Second
   * @param state
   * @param action
   * @constructor
   */
  FILTER_BY_REGEX: (state, {filterValue}) => {
    state.images = state.images.filter(data => {
      try {
        return data.src.match(filterValue)

      } catch (e) {
        // set not visible
        return false
      }
    })
  },

  /**
   * filter by size
   * Filter Priority: Third
   * @param state
   * @param option
   * @constructor
   */
  FILTER_BY_SIZE: (state, {option}) => {
    state.images = state.images.filter(image => util.shouldFilterBySize(image, option))
  },

  /**
   * filter by image is linked image or not
   * Priority: First
   * @param state
   * @param checked
   * @constructor
   */
  FILTER_BY_LINKED_IMAGE: (state, {onlyImagesFromLinks}) => {
    if (onlyImagesFromLinks)
      state.images = state.sources
        .filter(image => image.visible && image.linked)

    else
      state.images = state.sources.filter(image => image.visible)
  }
}

const sagas = createSagas({})

const util = {
  /**
   * whether to filter or not
   * @param image
   * @param option
   * @returns {boolean}
   */
  shouldFilterBySize (image, option) {
    const minWidthIsOk = option.minWidthEnabled === false
      || (option.minWidthEnabled && image.width >= option.minWidth)

    const maxWidthIsOk = option.maxWidthEnabled === false
      || (option.maxWidthEnabled && image.width <= option.maxWidth)

    const minHeightIsOk = option.minHeightEnabled === false
      || (option.minHeightEnabled && image.height >= option.minHeight)

    const maxHeightIsOk = option.maxHeightEnabled === false
      || (option.maxHeightEnabled && image.height <= option.maxHeight)

    return (
      minWidthIsOk
      && maxWidthIsOk
      && minHeightIsOk
      && maxHeightIsOk
    )
  },
}

export const module = {
  name: 'image',
  state,
  actions,
  mutations,
  sagas
}

export default createContainer(module)
