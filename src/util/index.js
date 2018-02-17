/**
 * get images from active tab of current window
 * @return {Promise<void>}
 */
export const getImages = () => {
  // get current window
  chrome.windows.getCurrent(
    currentWindow => {
      // get active tab
      chrome.tabs.query({
          active: true,
          windowId: currentWindow.id
        },
        activeTabs => {
          // execute JS and get image urls
          chrome.tabs.executeScript(
            activeTabs[0].id, {
              file: '/scripts/send-image.js',
              allFrames: true,
            }
          )
        }
      )
    }
  )

  return new Promise(resolve => {
    chrome.runtime.onMessage
      .addListener(results => resolve(results))
  })
}

/**
 * get option values from local storage
 * @param key
 * @return {Promise}
 */
export const getSavedOptions = (key) => {
  return new Promise(resolve => {
    chrome.storage.local.get({key, value: null}, items => {
      resolve(items.value)
    })
  })
}

/**
 * set option values for local storage when it is changed
 * @param key
 * @param value
 * @return {Promise}
 */
export const saveOptions = ({key, value}) => {
  return getSavedOptions(key)
    .then(savedValue => {
      // if saved value is equal new value, do not anything
      if (Object.keys(value).find(key => value[key] !== savedValue[key]))
        return new Promise(resolve => {
          chrome.storage.local.set({key, value}, () => {
            resolve('saved')
          })
        })

      else
        return 'skipped'
    })
}

/**
 * suggest new filename
 * @param subfolder
 * @param filename
 * @returns {string}
 */
export const suggestNewFilename = (subfolder = '', filename = '') => {
  if (subfolder !== '') {
    if (/\/$/.test(subfolder))
      subfolder = `${subfolder}/`
  }

  return `${subfolder}${filename}`
}
