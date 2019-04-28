function sendImages () {
  /* globals chrome */
  "use strict";

  const imageDownloader = {
    // Source: https://support.google.com/webmasters/answer/2598805?hl=en
    imageRegex: /(?:([^:/?#]+):)?(?:\/\/([^/?#]*))?([^?#]*\.(?:bmp|gif|jpe?g|a?png|svg|webp|ico))(?:\?([^#]*))?(?:#(.*))?/i,

    extractImagesFromTags: function() {
      return []
        .slice
        .apply(document.querySelectorAll("img, a, [style]"))
        .map(imageDownloader.extractImageFromElement)
    },

    extractImagesFromStyles: function() {
      const imagesFromStyles = [];
      for (let i = 0; i < document.styleSheets.length; i++) {
        let cssRules = null;
        try {
          cssRules = document.styleSheets[i].cssRules;
          if (!cssRules) continue;

          for (let j = 0; j < cssRules.length; j++) {
            const style = cssRules[j].style;
            if (style && style.backgroundImage) {
              const url = imageDownloader.extractURLFromStyle(style.backgroundImage);
              if (imageDownloader.isImageURL(url)) {
                imagesFromStyles.push(url);
              }
            }
          }
        } catch (e) {
          continue;
        }
      }

      return imagesFromStyles;
    },

    extractImageFromElement: function(element) {
      if (element.tagName.toLowerCase() === "img") {
        let src = element.src;
        const hashIndex = src.indexOf("#");
        if (hashIndex >= 0) {
          src = src.substr(0, hashIndex);
        }
        return src;
      }

      if (element.tagName.toLowerCase() === "a") {
        const href = element.href;
        if (imageDownloader.isImageURL(href)) {
          imageDownloader.linkedImages.push(href);
          return href;
        }
      }

      const backgroundImage = window.getComputedStyle(element).backgroundImage;
      if (backgroundImage) {
        const parsedURL = imageDownloader.extractURLFromStyle(backgroundImage);
        if (imageDownloader.isImageURL(parsedURL)) {
          return parsedURL;
        }
      }

      return "";
    },

    extractURLFromStyle: function(url) {
      return url
        .replace(/^url\(["']?/, "")
        .replace(/["']?\)$/, "");
    },

    isImageURL: function(url) {
      return url.indexOf("data:image") === 0
        || imageDownloader.imageRegex.test(url);
    },

    isRelativeURL: function(url) {
      if (url.indexOf("data:image") === 0) {
        return false
      }

      return /^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/.test(url)
    },

    isCorrectURL: function(url) {
      console.log(url)
      if (url.indexOf("data:image") === 0) {
        return true
      }

      const pathname = (new URL(url)).pathname;
      return !pathname.includes('http://') && !pathname.includes('https://')
    },

    relativeUrlToAbsolute: function(url) {
      return imageDownloader.isImageURL(url) && imageDownloader.isRelativeURL(url)
        ? new URL(url, window.location).toString()
        : url;
    },

    removeDuplicateOrEmpty: function(images) {
      const result = [];
      const hash = {};

      for (let i = 0; i < images.length; i++) {
        hash[images[i]] = 0;
      }

      for (const key in hash) {
        if (key !== "") {
          result.push(key);
        }
      }

      return result;
    }
  };

  imageDownloader.linkedImages = [];
  imageDownloader.images = imageDownloader
    .removeDuplicateOrEmpty([]
      .concat(
        imageDownloader.extractImagesFromTags(),
        imageDownloader.extractImagesFromStyles()
      )
      .map(imageDownloader.relativeUrlToAbsolute)
    )
    .filter(imageDownloader.isCorrectURL);

  imageDownloader.linkedImages = imageDownloader
    .removeDuplicateOrEmpty(
      imageDownloader.linkedImages.slice()
        .map(imageDownloader.relativeUrlToAbsolute)
    )
    .filter(imageDownloader.isCorrectURL);

  chrome.runtime.sendMessage({
    hostname: (new URL(location.href)).hostname,
    linkedImages: imageDownloader.linkedImages,
    images: imageDownloader.images
  });

  imageDownloader.linkedImages = null;
  imageDownloader.images = null;
}

document.addEventListener("DOMContentLoaded", sendImages, false);
sendImages();
