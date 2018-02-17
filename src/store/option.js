import { createSagas, createContainer } from 'redux-box'
// import { call } from 'redux-saga/effects'
import { saveOptions } from '../util'

export const mutationType = {
  SET_VALUES: 'SET_VALUES',
  SET_SUBFOLDER: 'SET_SUBFOLDER',
  SET_FILTER: 'SET_FILTER',
  SET_FILTER_TYPE: 'SET_FILTER_TYPE',
  SET_MIN_WIDTH: 'SET_MIN_WIDTH',
  SET_MIN_WIDTH_ENABLED: 'SET_MIN_WIDTH_ENABLED',
  SET_MAX_WIDTH: 'SET_MAX_WIDTH',
  SET_MAX_WIDTH_ENABLED: 'SET_MAX_WIDTH_ENABLED',
  SET_MIN_HEIGHT: 'SET_MIN_HEIGHT',
  SET_MIN_HEIGHT_ENABLED: 'SET_MIN_HEIGHT_ENABLED',
  SET_MAX_HEIGHT: 'SET_MAX_HEIGHT',
  SET_MAX_HEIGHT_ENABLED: 'SET_MAX_HEIGHT_ENABLED',
  SET_ONLY_IMAGES_FROM_LINKS: 'SET_ONLY_IMAGES_FROM_LINKS',
  SAVE_TO_LOCAL_STORAGE: 'SAVE_TO_LOCAL_STORAGE',
}

const state = {
  subfolder: '',
  filter: '',
  // filterType 0: normal, 1: wildcard, 2: regex
  filterType: 0,
  minWidth: 0,
  minWidthEnabled: false,
  maxWidth: 3000,
  maxWidthEnabled: false,
  minHeight: 0,
  minHeightEnabled: false,
  maxHeight: 3000,
  maxHeightEnabled: false,
  onlyImagesFromLinks: false,
}

const actions = {
  setValues: values => ({
    type: mutationType.SET_VALUES,
    values
  }),

  setSubfolder: subfolder => ({
    type: mutationType.SET_SUBFOLDER,
    subfolder
  }),

  setFilter: filter => ({
    type: mutationType.SET_FILTER,
    filter
  }),

  setFilterType: filterType => ({
    type: mutationType.SET_FILTER_TYPE,
    filterType
  }),

  setMinWidth: minWidth => ({
    type: mutationType.SET_MIN_WIDTH,
    minWidth
  }),

  setMinWidthEnabled: minWidthEnabled => ({
    type: mutationType.SET_MIN_WIDTH_ENABLED,
    minWidthEnabled
  }),

  setMaxWidth: maxWidth => ({
    type: mutationType.SET_MAX_WIDTH,
    maxWidth
  }),

  setMaxWidthEnabled: maxWidthEnabled => ({
    type: mutationType.SET_MAX_WIDTH_ENABLED,
    maxWidthEnabled
  }),

  setMinHeight: minHeight => ({
    type: mutationType.SET_MIN_HEIGHT,
    minHeight
  }),

  setMinHeightEnabled: minHeightEnabled => ({
    type: mutationType.SET_MIN_HEIGHT_ENABLED,
    minHeightEnabled
  }),

  setMaxHeight: maxHeight => ({
    type: mutationType.SET_MAX_HEIGHT,
    maxHeight
  }),

  setMaxHeightEnabled: maxHeightEnabled => ({
    type: mutationType.SET_MAX_HEIGHT_ENABLED,
    maxHeightEnabled
  }),

  setOnlyImagesFromLinks: onlyImagesFromLinks => ({
    type: mutationType.SET_ONLY_IMAGES_FROM_LINKS,
    onlyImagesFromLinks
  }),

  saveToLocalStorage: async () => ({
    type: mutationType.SAVE_TO_LOCAL_STORAGE
  })
}

const mutations = {
  SET_VALUES: (state, {values}) => {
    if (values !== null) {
      Object.keys(values)
        .forEach(key => state[key] = values[key])
    }
  },

  /**
   * set subfolder
   * @param state
   * @param action
   * @returns {string|*|string}
   * @constructor
   */
  SET_SUBFOLDER: (state, {subfolder}) => (
    state.subfolder = subfolder
  ),

  /**
   * set filter
   * @param state
   * @param action
   * @returns {*}
   * @constructor
   */
  SET_FILTER: (state, {filter}) => (
    state.filter = filter
  ),

  /**
   * set filterType
   * @param state
   * @param action
   * @returns {number|*}
   * @constructor
   */
  SET_FILTER_TYPE: (state, {filterType}) => (
    state.filterType = filterType
  ),

  /**
   * set minWidth
   * @param state
   * @param action
   * @returns {number|*|string}
   * @constructor
   */
  SET_MIN_WIDTH: (state, {minWidth}) => (
    state.minWidth = minWidth
  ),

  /**
   * set minWidthEnabled
   * @param state
   * @param action
   * @returns {boolean|*}
   * @constructor
   */
  SET_MIN_WIDTH_ENABLED: (state, {minWidthEnabled}) => (
    state.minWidthEnabled = minWidthEnabled
  ),

  /**
   * set maxWidth
   * @param state
   * @param action
   * @returns {number|*|string}
   * @constructor
   */
  SET_MAX_WIDTH: (state, {maxWidth}) => (
    state.maxWidth = maxWidth
  ),

  /**
   * set maxWidthEnabled
   * @param state
   * @param action
   * @returns {boolean|*}
   * @constructor
   */
  SET_MAX_WIDTH_ENABLED: (state, {maxWidthEnabled}) => (
    state.maxWidthEnabled = maxWidthEnabled
  ),

  /**
   * set winHeight
   * @param state
   * @param action
   * @returns {number|*|string}
   * @constructor
   */
  SET_MIN_HEIGHT: (state, {minHeight}) => (
    state.minHeight = minHeight
  ),

  /**
   * set minHeightEnabled
   * @param state
   * @param action
   * @returns {boolean|*}
   * @constructor
   */
  SET_MIN_HEIGHT_ENABLED: (state, {minHeightEnabled}) => (
    state.minHeightEnabled = minHeightEnabled
  ),

  /**
   * set maxHeight
   * @param state
   * @param action
   * @returns {number|*|string}
   * @constructor
   */
  SET_MAX_HEIGHT: (state, {maxHeight}) => (
    state.maxHeight = maxHeight
  ),

  /**
   * set maxHeightEnabled
   * @param state
   * @param action
   * @returns {boolean|*}
   * @constructor
   */
  SET_MAX_HEIGHT_ENABLED: (state, {maxHeightEnabled}) => (
    state.maxHeightEnabled = maxHeightEnabled
  ),

  /**
   * set isOnlyLinks
   * @param state
   * @param action
   * @returns {boolean|*}
   * @constructor
   */
  SET_ONLY_IMAGES_FROM_LINKS: (state, {onlyImagesFromLinks}) => (
    state.onlyImagesFromLinks = onlyImagesFromLinks
  ),

  SAVE_TO_LOCAL_STORAGE: (state, _) => {
    saveOptions({key: 'options', value: Object.assign({}, state)})
      .catch(error => console.log(error))
  }
}

const sagas = createSagas({})

export const module = {
  name: 'option',
  state,
  actions,
  mutations,
  sagas
}

export default createContainer(module)
