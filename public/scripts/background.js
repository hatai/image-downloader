chrome.runtime.onInstalled.addListener(function (details) {
  const reason = details.reason
  if (reason === 'install' || reason === 'update') {
    chrome.tabs.create({url: 'https://hatai.github.io/image-downloader/'})
  }
})
