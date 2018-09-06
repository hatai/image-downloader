import { mutationType as optionType } from '../option'
import { mutationType as imageType } from '../image'

export default store => next => action => {
  const result = next(action)

  if (isTarget(action.type)) {
    const state = store.getState()

    filterAction(store, state)
      .then(() => {
        if (isChangedOptionValue(action.type))
          store.dispatch({
            type: optionType.SAVE_TO_LOCAL_STORAGE
          })
      })
      .catch(error => console.log(error))

  }

  return result
}

const isTarget = type => {
  switch (type) {
    case optionType.SET_FILTER:
    case optionType.SET_FILTER_TYPE:
    case optionType.SET_MIN_WIDTH:
    case optionType.SET_MIN_WIDTH_ENABLED:
    case optionType.SET_MAX_WIDTH:
    case optionType.SET_MAX_WIDTH_ENABLED:
    case optionType.SET_MIN_HEIGHT:
    case optionType.SET_MIN_HEIGHT_ENABLED:
    case optionType.SET_MAX_HEIGHT:
    case optionType.SET_MAX_HEIGHT_ENABLED:
    case optionType.SET_ONLY_IMAGES_FROM_LINKS:
    case imageType.RUN_FILTER:
    case imageType.SET_NATURAL_SIZE:
    case imageType.SET_NATURAL_WIDTH:
    case imageType.SET_NATURAL_HEIGHT:
      return true
    default:
      return false
  }
}

const isChangedOptionValue = type => {
  switch (type) {
    case optionType.SET_FILTER:
    case optionType.SET_FILTER_TYPE:
    case optionType.SET_MIN_WIDTH:
    case optionType.SET_MIN_WIDTH_ENABLED:
    case optionType.SET_MAX_WIDTH:
    case optionType.SET_MAX_WIDTH_ENABLED:
    case optionType.SET_MIN_HEIGHT:
    case optionType.SET_MIN_HEIGHT_ENABLED:
    case optionType.SET_MAX_HEIGHT:
    case optionType.SET_MAX_HEIGHT_ENABLED:
    case optionType.SET_ONLY_IMAGES_FROM_LINKS:
      return true
    default:
      return false
  }
}

/**
 * do image filtering
 * at first filter by isLinked
 * second filter by normal|wildcard|regex
 * finally filter by size
 * @param store
 * @param state
 * @returns {Promise<void>}
 */
const filterAction = async (store, state) => {
  const option = state.option

  store.dispatch({
    type: imageType.FILTER_BY_LINKED_IMAGE,
    onlyImagesFromLinks: option.onlyImagesFromLinks
  })

  switch (option.filterType) {
    case 0:
      store.dispatch({
        type: imageType.FILTER_BY_NORMAL,
        filterValue: option.filter
      })
      break

    case 1:
      store.dispatch({
        type: imageType.FILTER_BY_WILDCARD,
        filterValue: option.filter
      })
      break

    case 2:
      store.dispatch({
        type: imageType.FILTER_BY_REGEX,
        filterValue: option.filter
      })
      break

    default:
      break
  }

  store.dispatch({
    type: imageType.FILTER_BY_SIZE,
    option: {
      minWidthEnabled: option.minWidthEnabled,
      minWidth: option.minWidth,
      maxWidthEnabled: option.maxWidthEnabled,
      maxWidth: option.maxWidth,
      minHeightEnabled: option.minHeightEnabled,
      minHeight: option.minHeight,
      maxHeightEnabled: option.maxHeightEnabled,
      maxHeight: option.maxHeight,
    }
  })

  // check all images are checked
  store.dispatch({
    type: imageType.IS_CHECKED_ALL
  })
}
