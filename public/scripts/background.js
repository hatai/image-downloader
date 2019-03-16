chrome.runtime.onMessage.addListener(function(message, image) {
  if (message === "download") {
    chrome.downloads.download({ url: image });
  }
});