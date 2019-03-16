/* eslint-disable no-undef */
import { KEY } from './constants';

/**
 * get images from active tab of current window
 * @return {Promise<void>}
 */
export const getImages = () => {
  // get current window
  chrome.windows.getCurrent(currentWindow => {
    // get active tab
    chrome.tabs.query(
      { active: true, windowId: currentWindow.id },
      activeTabs => {
        // execute JS and get image urls
        chrome.tabs.executeScript(activeTabs[0].id, {
          file: '/scripts/send-image.js',
          allFrames: true
        });
      }
    );
  });

  return new Promise(resolve => {
    chrome.runtime.onMessage.addListener(results => resolve(results));
  });
};

/**
 * get option values from local storage
 * @param key
 * @return {Promise}
 */
export const getSavedOptions = key => {
  return new Promise(resolve => {
    const item = localStorage.getItem(key);
    resolve(JSON.parse(item));
  });
};

/**
 * set option values for local storage when it is changed
 * @param key
 * @param value
 */
export const saveOptions = ({ key, value }) => {
  localStorage.setItem(key, JSON.stringify(value));
};

/**
 * suggest new filename
 * @param subfolder
 * @param filename
 * @returns {string}
 */
export const suggestNewFilename = (subfolder = '', filename = '') => {
  if (subfolder !== '') {
    if (/\/$/.test(subfolder) === false) subfolder = `${subfolder}/`;
  }

  return `${subfolder}${filename}`;
};

export const saveSettingsToLocalStorage = values => {
  saveOptions({
    key: KEY,
    value: Object.assign({}, values)
  });
};
