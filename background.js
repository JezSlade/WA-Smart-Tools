// background.js - Manages Dev Mode state and global settings

// On installation, initialize devMode to false
chrome.runtime.onInstalled.addListener(() => {
    console.log("WA Smart Tools - Trainer Model installed.");
    chrome.storage.local.set({ devMode: false }, () => {
        console.log("Default devMode set to false.");
    });
});

// Listen for messages to toggle Dev Mode or for other global actions
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    try {
        if (request.action === "toggleDevMode") {
            // Toggle the devMode setting
            chrome.storage.local.get("devMode", (data) => {
                let newState = !data.devMode;
                chrome.storage.local.set({ devMode: newState }, () => {
                    console.log("Dev mode toggled to:", newState);
                    sendResponse({ status: "success", devMode: newState });
                });
            });
            // Return true to indicate asynchronous response
            return true;
        }
    } catch (error) {
        console.error("Error in background.js message listener:", error);
        sendResponse({ status: "error", message: error.message });
    }
});
