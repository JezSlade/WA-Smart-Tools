chrome.runtime.onInstalled.addListener(function() {
    console.log('WA Smart Tools Extension Installed');
});

// Open the trainer page when clicking the extension icon
chrome.action.onClicked.addListener(function(tab) {
    chrome.tabs.create({ url: chrome.runtime.getURL("trainer.html") });
});
