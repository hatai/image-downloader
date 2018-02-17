(function () {
  'use strict'

  // One-time reset of settings
  chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === 'update' && /^((([01])\..*)|(2\.(0|1)(\..*)?))$/.test(details.previousVersion)) { // Clear data from versions before 2.1
      // chrome.storage.local.clear()
      chrome.runtime.getBackgroundPage(win => {
        win.localStorage.clear()
      })
    }
  })

  // Popup
  const defaults = {
    // Filters
    folderName: '',
    newFileName: '',
    filter: '',
    filterType: 0,
    minWidth: 0,
    minWWidthEnabled: false,
    maxWidth: 3000,
    maxWidthEnabled: false,
    minHeight: 0,
    minHeightEnabled: false,
    maxHeight: 3000,
    maxHeightEnabled: false,
    onlyImagesFromLinks: false,
    // Options
    // General
    showDownloadConfirmation: true,
    showDownloadNotification: true,
    showFileRenaming: false,
    // Filters
    showUrlFilter: true,
    showImageWidthFilter: true,
    showImageHeightFilter: true,
    showOnlyImagesFromLinks: true,
    // Images
    showImageUrl: true,
    showOpenImageButton: true,
    showDownloadImageButton: true,
    // columns: 2,
    // imageMinWidth: 50,
    // imageMaxWidth: 200,
    // imageBorderWidth: 3,
    // imageBorderColor: '#3498db'
  }

  Object.keys(defaults).forEach(key => {
    // chrome.storage.local.set({[key]: defaults[key]})
    // chrome.storage.local.set({[`${key}_default`]: defaults[key]})
    chrome.runtime.getBackgroundPage(win => {
      win.localStorage.setItem(`${key}`, `${defaults[key]}`)
      win.localStorage.setItem(`${key}_default`, `${defaults[key]}`)
    })

  })

  // chrome.storage.local.set({options: JSON.stringify(Object.keys(defaults))})
  chrome.runtime.getBackgroundPage(win => {
    win.localStorage.setItem('options', JSON.stringify(defaults))
  })

  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log(`onMassage: ${JSON.stringify(message)}`)

    if (message.method === 'setStorage') {
      // chrome.storage.local.set(message.data, () => {
      //   sendResponse('success')
      // })

      chrome.runtime.getBackgroundPage(win => {
        win.localStorage.setItem(`${message.item.key}`, `${message.item.value}`)
      })

      sendResponse('saved')

    } else if (message.method === 'getStorage') {
      // chrome.storage.local.get('options', items => {
      //   console.log(items)
      //   sendResponse(items)
      // })
      chrome.runtime.getBackgroundPage(win => {
        const item = win.localStorage.getItem(message.key)

        console.log(item)

        sendResponse(item)
      })
    }
  })
}())
