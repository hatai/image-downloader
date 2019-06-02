/* eslint-env webextensions */
import { action, computed, decorate, observable } from 'mobx';
import uuid from 'uuid/v1';
import warning from 'warning';
import settingsModel from './settings';
import { REGEX_IMAGE } from '../utils/constants';

class ImageModel {
  id = '';
  src = '';
  hostname = '';
  width = 0;
  height = 0;
  linked = false;
  checked = false;
  visible = true;
  downloaded = false;
  loaded = false;
  loadFailed = false;

  constructor(src, width, height, linked = false) {
    this.id = uuid();
    this.src = src;
    this.hostname = new URL(src).hostname;
    this.linked = linked;
    this.width = width;
    this.height = height;
  }

  get url() {
    if (this.src.indexOf('data:image') === 0) {
      return this.src;
    }

    return this.src.split(/[?#]/)[0];
  }

  download() {
    chrome.downloads.download({ url: this.src });
    this.downloaded = true;
  }
}

decorate(ImageModel, {
  // observable
  id: observable.ref,
  src: observable,
  hostname: observable,
  width: observable,
  height: observable,
  linked: observable,
  checked: observable,
  visible: observable,
  loaded: observable,
  loadFailed: observable,

  // computed
  url: computed,

  // action
  download: action.bound
});

class ImageListModel {
  hostname = '';
  sources = [];

  /********************************************************************
   * Getter
   ********************************************************************/

  get images() {
    return this.sources.filter(image => image.visible);
  }

  get isCheckedAll() {
    return this.images.every(image => image.checked);
  }

  get isNotCheckedAll() {
    return this.images.every(image => !image.checked);
  }

  get isIndeterminate() {
    return !this.isCheckedAll && !this.isNotCheckedAll;
  }

  get checkedImages() {
    return this.images.filter(image => image.visible && image.checked);
  }

  get uncheckedImages() {
    return this.images.filter(image => image.visible && !image.checked);
  }

  get linkedImages() {
    return this.images.filter(image => image.linked);
  }

  get notLinkedImages() {
    return this.images.filter(image => !image.linked);
  }

  get progress() {
    const countLoaded = this.images.filter(image => image.loaded).length;
    return (countLoaded / this.images.length) * 100;
  }

  /********************************************************************
   * Setter
   ********************************************************************/

  set linkedImages(images) {
    this.sources = [].concat(
      this.sources,
      images.map(
        image =>
          new ImageModel(
            image,
            settingsModel.midWidth,
            settingsModel.midHeight,
            true
          )
      )
    );
  }

  set notLinkedImages(images) {
    this.sources = [].concat(
      this.sources,
      images.map(
        image =>
          new ImageModel(
            image,
            settingsModel.midWidth,
            settingsModel.midHeight,
            false
          )
      )
    );
  }

  /********************************************************************
   * Method
   ********************************************************************/

  downloadAll() {
    this.images
      .filter(image => image.visible && image.checked)
      .forEach(image => image.download());
  }

  /********************************************************************
   * Action
   ********************************************************************/

  reset() {
    this.sources = [];
  }

  checkAll() {
    this.images
      .filter(image => image.visible)
      .forEach(image => {
        image.checked = true;
      });
  }

  uncheckAll() {
    this.images
      .filter(image => image.visible)
      .forEach(image => {
        image.checked = false;
      });
  }

  doFilter(settings) {
    const {
      filter,
      filterType,
      minWidth,
      minWidthEnabled,
      maxWidth,
      maxWidthEnabled,
      minHeight,
      minHeightEnabled,
      maxHeight,
      maxHeightEnabled,
      onlyImagesHasSameHostname,
      onlyImagesFromLink,
      excludeQueryImage
    } = settings;

    // reset
    this.sources.forEach(image => {
      image.visible = !image.loadFailed;
    });

    if (excludeQueryImage) {
      this.filterByExcludeQueryImage();
    }

    if (onlyImagesHasSameHostname) {
      this.filterByHostname();
    }

    if (onlyImagesFromLink) {
      this.filterByLinkedImage();
    }

    switch (filterType) {
      case 0:
        this.filterByNormal(filter);
        break;

      case 1:
        this.filterByWildCard(filter);
        break;

      case 2:
        this.filterByRegex(filter);
        break;

      default:
        break;
    }

    this.filterByImageSize({
      minWidthEnabled,
      minWidth,
      maxWidthEnabled,
      maxWidth,
      minHeightEnabled,
      minHeight,
      maxHeightEnabled,
      maxHeight
    });
  }

  filterByHostname() {
    this.images
      .filter(image => image.visible)
      .forEach(image => {
        image.visible = this.hostname === image.hostname;
      });
  }

  filterByLinkedImage() {
    this.images
      .filter(image => image.visible)
      .forEach(image => {
        image.visible = image.linked;
      });
  }

  filterByExcludeQueryImage() {
    this.images
      .filter(image => image.visible)
      .forEach(image => {
        if (image.url.indexOf('data:image') !== 0) {
          image.visible = REGEX_IMAGE.test(image.url);
        }
      });
  }

  filterByNormal(filterValue) {
    if (filterValue === '' || filterValue === null) {
      // do not anything
      return;
    }

    const terms = filterValue.split(' ');
    this.images
      .filter(image => image.visible)
      .forEach(image => {
        for (let i = 0; i < terms.length; i++) {
          let term = terms[i];

          if (term.length !== 0) {
            let expected = term[0] !== '-';

            if (!expected) {
              term = term.substr(1);

              if (term.length === 0) {
                continue;
              }
            }

            image.visible = (image.src.indexOf(term) !== -1) === expected;
          }
        }

        // set not visible
        image.visible = false;
      });
  }

  filterByWildCard(filterValue) {
    if (filterValue === '' || filterValue === null) {
      // do not anything
      return;
    }

    const newFilterValue = filterValue
      .replace(/([.^$[\]\\(){}|-])/g, '\\$1')
      .replace(/([?*+])/, '.$1');

    try {
      if (this.images.length > 0) {
        this.images[0].src.match(newFilterValue);
      }

      this.images
        .filter(image => image.visible)
        .forEach(image => {
          image.visible = image.src.match(newFilterValue);
        });
    } catch (e) {
      warning(false, '%s', e);
    }
  }

  filterByRegex(filterValue) {
    if (filterValue === '' || filterValue === null) {
      // do not anything
      return;
    }

    try {
      if (this.images.length > 0) {
        this.images[0].src.match(filterValue);
      }
      this.images
        .filter(image => image.visible)
        .forEach(image => {
          image.visible = image.src.match(filterValue);
        });
    } catch (e) {
      warning(false, '%s', e);
    }
  }

  filterByImageSize(settings) {
    this.images
      .filter(image => image.visible)
      .forEach(image => {
        image.visible = validateImageSize(image, settings);
      });
  }
}

decorate(ImageListModel, {
  // observable
  sources: observable.ref,
  // computed
  images: computed,
  isCheckedAll: computed,
  isNotCheckedAll: computed,
  isIndeterminate: computed,
  checkedImages: computed,
  uncheckedImages: computed,
  linkedImages: computed,
  notLinkedImages: computed,
  progress: computed,
  // action
  checkAll: action.bound,
  uncheckAll: action.bound,
  doFilter: action.bound
});

/**
 * whether to filter or not
 * @param image
 * @param settings
 * @returns {boolean}
 */
const validateImageSize = (image, settings) => {
  const minWidthIsOk =
    settings.minWidthEnabled === false ||
    (settings.minWidthEnabled && image.width >= settings.minWidth);

  const maxWidthIsOk =
    settings.maxWidthEnabled === false ||
    (settings.maxWidthEnabled && image.width <= settings.maxWidth);

  const minHeightIsOk =
    settings.minHeightEnabled === false ||
    (settings.minHeightEnabled && image.height >= settings.minHeight);

  const maxHeightIsOk =
    settings.maxHeightEnabled === false ||
    (settings.maxHeightEnabled && image.height <= settings.maxHeight);

  return minWidthIsOk && maxWidthIsOk && minHeightIsOk && maxHeightIsOk;
};

const imageListModel = new ImageListModel();
export default imageListModel;
