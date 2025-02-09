document.addEventListener('DOMContentLoaded', function() {
    const devModeButton = document.getElementById('devModeButton');
  
    if (!devModeButton) {
      console.error('Dev Mode button not found!');
      return;
    }
  
    devModeButton.addEventListener('click', function() {
      // Check and toggle the status (defined or not)
      chrome.storage.local.get('status', function(result) {
        if (chrome.runtime.lastError) {
          console.error('Error retrieving status:', chrome.runtime.lastError);
          return;
        }
  
        if (result.status === undefined) {
          console.log('Status is missing. Setting default status to "inactive".');
          chrome.storage.local.set({ status: 'inactive' }, function() {
            console.log('Default status set.');
          });
        }
  
        // Toggling the dev mode status
        const newStatus = result.status === 'inactive' ? 'active' : 'inactive';
  
        chrome.storage.local.set({ status: newStatus }, function() {
          console.log('Dev Mode status set to:', newStatus);
          toggleDevModeUI(newStatus);
        });
      });
    });
  
    function toggleDevModeUI(status) {
      if (status === 'active') {
        console.log('Entering Debug Mode...');
        // Show debug UI, modify according to your design
      } else {
        console.log('Exiting Debug Mode...');
        // Hide debug UI
      }
    }
  });
  