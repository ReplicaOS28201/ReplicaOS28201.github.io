/**
 * Checks if the device is connected to a network and notifies the user if not.
 * 
 * @returns {boolean} Returns true if online, false otherwise.
 */
function checkConnectionStatus() {
  const isOnline = window.navigator.onLine;

  if (!isOnline) {
    const offlineMessage = 'You are not connected to the internet. Please check your Wi-Fi or network settings.';
    
    // Notify the user via browser alert
    alert(offlineMessage);
    
    // Log for debugging purposes
    console.warn('Connectivity Check:', offlineMessage);
  }

  return isOnline;
}

