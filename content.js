// Initialize the trainer UI overlay once the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    try {
      // Check if 'local' is defined before attempting to access it
      if (typeof localStorage !== 'undefined') {
        console.log('Local storage is available');
        initializeTrainerUI();
      } else {
        console.error('Local storage is not available on this browser');
      }
    } catch (error) {
      console.error('Error initializing Trainer UI overlay:', error);
    }
  });
  
  // Function to initialize Trainer UI overlay
  function initializeTrainerUI() {
    try {
      // Ensure the UI elements and functionality are properly set up
      let trainerButton = document.createElement('button');
      trainerButton.innerHTML = "Start Trainer";
      trainerButton.addEventListener('click', function () {
        // Trigger training mode
        startTrainer();
      });
  
      document.body.appendChild(trainerButton);
    } catch (error) {
      console.error('Error initializing Trainer UI overlay:', error);
    }
  }
  
  // Function to handle the trainer's operations
  function startTrainer() {
    try {
      // Check if localStorage is defined
      if (typeof localStorage === 'undefined') {
        throw new Error('LocalStorage is not available');
      }
  
      // Start the process of collecting data (e.g., URL and input fields)
      const currentURL = window.location.href;
      const data = {
        url: currentURL,
        fields: []  // You can store the defined input fields here later
      };
  
      // Store data in localStorage for debugging or training purposes
      localStorage.setItem('trainer_data', JSON.stringify(data));
  
      console.log('Training data initialized and stored:', data);
    } catch (error) {
      console.error('Error starting trainer:', error);
    }
  }
  