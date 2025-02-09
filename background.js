chrome.runtime.onInstalled.addListener(function() {
    console.log('WA Smart Tools Extension Installed');
});

// Open the trainer page when clicking the browser action icon
chrome.browserAction.onClicked.addListener(function(tab) {
    chrome.tabs.create({ url: chrome.runtime.getURL("trainer.html") });
});
