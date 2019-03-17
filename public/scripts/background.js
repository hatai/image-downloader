chrome.runtime.onInstalled.addListener(function() {
  chrome.tabs.create({ url: "https://hatai.github.io/image-downloader/" });
});
