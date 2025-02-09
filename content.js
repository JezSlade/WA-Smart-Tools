// content.js - Handles the Trainer UI overlay and element selection logic
// This script runs on all pages as specified in manifest.json

// Immediately check if Dev Mode is enabled, and if so, inject the Trainer UI overlay.
(function() {
    try {
        chrome.storage.local.get("devMode", (data) => {
            if (data.devMode) {
                console.log("Dev Mode is active; injecting Trainer UI overlay.");
                injectTrainerUI();
            } else {
                console.log("Dev Mode is inactive; Trainer UI overlay not injected.");
            }
        });
    } catch (error) {
        console.error("Error initializing Trainer UI overlay:", error);
    }
})();

/**
 * injectTrainerUI
 * Injects a floating overlay into the webpage that provides Trainer controls.
 */
function injectTrainerUI() {
    try {
        // Prevent duplicate injection of the overlay.
        if (document.getElementById("trainerOverlay")) {
            console.warn("Trainer overlay already exists. Skipping injection.");
            return;
        }
        
        // Create the overlay container.
        let trainerOverlay = document.createElement("div");
        trainerOverlay.id = "trainerOverlay";
        trainerOverlay.innerHTML = `
            <div id="trainerPanel">
                <h3>Trainer Mode</h3>
                <p>Click a button to begin training:</p>
                <button id="defineInput">Define Input Field</button>
                <button id="defineMessages">Define Message Area</button>
                <button id="finishTraining">Finish Training</button>
            </div>
        `;
        document.body.appendChild(trainerOverlay);
        
        // Attach event listeners to the Trainer buttons.
        document.getElementById("defineInput").addEventListener("click", () => {
            selectElement("inputField");
        });
        document.getElementById("defineMessages").addEventListener("click", () => {
            selectElement("messageArea");
        });
        document.getElementById("finishTraining").addEventListener("click", saveTrainingData);
    } catch (error) {
        console.error("Error injecting Trainer UI:", error);
    }
}

/**
 * selectElement
 * Allows the user to click on a DOM element to define a particular training field.
 * @param {string} type - The type of element to define (e.g., "inputField" or "messageArea").
 */
function selectElement(type) {
    try {
        // Inform the user what they need to do.
        alert(`Please click on the ${type.replace(/([A-Z])/g, ' $1').toLowerCase()} you wish to define.`);
        
        // Add a temporary click event listener to capture the user's selection.
        document.addEventListener("click", function captureClick(event) {
            try {
                event.preventDefault();
                event.stopPropagation();
                
                let selectedElement = event.target;
                // Generate a unique CSS selector for the selected element.
                let selectorPath = getElementSelector(selectedElement);
                
                // Retrieve current training data, update it, and save it to storage.
                chrome.storage.local.get("trainingData", (data) => {
                    let updatedData = data.trainingData || {};
                    updatedData[type] = selectorPath;
                    chrome.storage.local.set({ trainingData: updatedData }, () => {
                        console.log(`Saved ${type}: ${selectorPath}`);
                    });
                });
            } catch (err) {
                console.error("Error capturing click in selectElement:", err);
            } finally {
                // Remove the event listener to avoid multiple selections.
                document.removeEventListener("click", captureClick, true);
            }
        }, true);
    } catch (error) {
        console.error("Error in selectElement function:", error);
    }
}

/**
 * getElementSelector
 * Recursively generates a unique CSS selector path for a given element.
 * @param {HTMLElement} element - The element for which to generate the selector.
 * @returns {string} The generated CSS selector.
 */
function getElementSelector(element) {
    try {
        if (!element) return null;
        let path = [];
        // Traverse the DOM tree upward to construct the selector.
        while (element.parentElement) {
            let tagName = element.tagName.toLowerCase();
            // Find siblings with the same tag name.
            let siblings = Array.from(element.parentElement.children).filter(el => el.tagName.toLowerCase() === tagName);
            let index = siblings.indexOf(element) + 1; // nth-of-type is 1-indexed.
            path.unshift(`${tagName}:nth-of-type(${index})`);
            element = element.parentElement;
        }
        return path.join(" > ");
    } catch (error) {
        console.error("Error generating element selector:", error);
        return "";
    }
}

/**
 * saveTrainingData
 * Retrieves the stored training data and notifies the user of completion.
 */
function saveTrainingData() {
    try {
        chrome.storage.local.get("trainingData", (data) => {
            if (data.trainingData) {
                console.log("Training Data Saved:", data.trainingData);
                alert("Training completed! Data has been logged.");
            } else {
                console.warn("No training data found.");
                alert("No training data was captured.");
            }
        });
    } catch (error) {
        console.error("Error saving training data:", error);
    }
}