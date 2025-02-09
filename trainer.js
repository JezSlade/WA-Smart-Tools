let inputFieldDefined = false;
let messageFieldDefined = false;

document.getElementById("dev-mode-toggle").addEventListener("click", function() {
    document.getElementById("trainer-ui").style.display = "block";
});

document.getElementById("define-input-field").addEventListener("click", function() {
    let inputField = prompt("Click on the input field area. Then click OK.");
    if (inputField) {
        inputFieldDefined = true;
        document.getElementById("input-field-status").textContent = "Yes";
        validateTraining();
    }
});

document.getElementById("define-message-field").addEventListener("click", function() {
    let messageField = prompt("Click on the message area. Then click OK.");
    if (messageField) {
        messageFieldDefined = true;
        document.getElementById("message-field-status").textContent = "Yes";
        validateTraining();
    }
});

document.getElementById("finish-training").addEventListener("click", function() {
    if (inputFieldDefined && messageFieldDefined) {
        alert("Training Completed! Your configurations have been saved.");
        // Call function to send data to your backend or save locally.
        window.close(); // Close trainer window
    } else {
        alert("Please define all areas before finishing.");
    }
});

function validateTraining() {
    if (inputFieldDefined && messageFieldDefined) {
        document.getElementById("finish-training").disabled = false;
    }
}
