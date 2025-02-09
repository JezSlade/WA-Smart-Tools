// popup.js - Handles the Dev Mode toggle from the popup UI

document.getElementById("toggleDevMode").addEventListener("click", () => {
    // Send a message to background.js to toggle the Dev Mode state
    chrome.runtime.sendMessage({ action: "toggleDevMode" }, (response) => {
        if (response.status === "success") {
            alert(`Dev Mode is now ${response.devMode ? "ON" : "OFF"}. Please refresh the page to see changes.`);
        } else {
            alert("Error toggling Dev Mode: " + response.message);
        }
    });
});
