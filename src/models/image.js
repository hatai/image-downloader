/* eslint-env webextensions */

import { observable, computed, action, decorate } from 'mobx';
import uuid from 'uuid/v1';

class ImageModel {
  id = '';
  src = '';
  width = 0;
  height = 0;
  linked = false;
  checked = false;
  visible = false;
  filtered = false;

  constructor(src, linked = false) {
    this.id = uuid();
    this.src = src;
    this.linked = linked;
  }
}

decorate(ImageModel, {
  id: observable.ref,
  src: observable,
  width: observable,
  height: observable,
  linked: observable,
  checked: observable,
  visible: observable,
  filtered: observable
});

class ImageListModel {
  sources = [];
  data = [];

  /********************************************************************
   * Getter
   ********************************************************************/

  get images() {
    return this.sources;
    // return this.data;
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
    return this.images.filter(image => image.checked);
  }

  get uncheckedImages() {
    return this.images.filter(image => !image.checked);
  }

  get linkedImages() {
    return this.images.filter(image => image.linked);
  }

  get notLinkedImages() {
    return this.images.filter(image => !image.linked);
  }

  /********************************************************************
   * Setter
   ********************************************************************/

  set linkedImages(images) {
    this.sources = [].concat(
      this.sources,
      images.map(image => new ImageModel(image, true))
    );
  }

  set notLinkedImages(images) {
    this.sources = [].concat(
      this.sources,
      images.map(image => new ImageModel(image, false))
    );
  }

  /********************************************************************
   * Action
   ********************************************************************/

  reset() {
    this.sources = [];
    this.data = [];
  }

  remove() {}

  check() {}

  checkAll() {
    // TODO: 後で正しい処理に治す
    this.data = this.data.map(image => {
      image.checked = true;
      return image;
    });
    this.sources = this.sources.map(image => {
      image.checked = true;
      return image;
    });
  }

  uncheckAll() {
    // TODO: 後で正しい処理に治す
    this.data = this.data.map(image => {
      image.checked = false;
      return image;
    });
    this.sources = this.sources.map(image => {
      image.checked = false;
      return image;
    });
  }

  doFilter() {}

  filterByNormal(filterValue) {
    if (filterValue === '' || filterValue === null) {
      // do not anything
      return;
    }

    const terms = filterValue.split(' ');
    this.data = this.data.filter(data => {
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

          return (data.src.indexOf(term) !== -1) === expected;
        }
      }

      // set visible
      return false;
    });
  }

  filterByWildCard(filterValue) {
    const newFilterValue = filterValue
      .replace(/([.^$[\]\\(){}|-])/g, '\\$1')
      .replace(/([?*+])/, '.$1');

    this.data = this.data.filter(data => {
      try {
        return data.src.match(newFilterValue);
      } catch (e) {
        // set not visible
        return false;
      }
    });
  }

  filterByRegex(filterValue) {
    this.data = this.data.filter(data => {
      try {
        return data.src.match(filterValue);
      } catch (e) {
        // set not visible
        return false;
      }
    });
  }

  filterByImageSize(settings) {
    this.data = this.data.filter(image => shouldFilterBySize(image, settings));
  }

  filterByLinkedImage(onlyImagesFromLinks) {
    if (onlyImagesFromLinks) {
      this.data = this.sources.filter(image => image.visible && image.linked);
    } else {
      this.data = this.sources.filter(image => image.visible);
    }
  }
}

decorate(ImageListModel, {
  // observable
  sources: observable.ref,
  data: observable.shallow,
  // computed
  images: computed,
  isCheckedAll: computed,
  isNotCheckedAll: computed,
  isIndeterminate: computed,
  checkedImages: computed,
  uncheckedImages: computed,
  linkedImages: computed,
  notLinkedImages: computed,
  // action
  remove: action.bound,
  check: action.bound,
  checkAll: action.bound,
  uncheckAll: action.bound,
  doFilter: action.bound,
  filterByNormal: action.bound,
  filterByWildCard: action.bound,
  filterByRegex: action.bound,
  filterByImageSize: action.bound,
  filterByLinkedImage: action.bound
});

/**
 * whether to filter or not
 * @param image
 * @param settings
 * @returns {boolean}
 */
const shouldFilterBySize = (image, settings) => {
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
