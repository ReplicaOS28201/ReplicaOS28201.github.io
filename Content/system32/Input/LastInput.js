/**
 * Last Input System
 * Monitors keyboard activity and darkens the screen after 30 seconds of inactivity.
 */

const LastInputSystem = (() => {
  const IDLE_TIMEOUT = 30000; // 30 seconds in milliseconds
  let lastInputTime = Date.now();
  let overlay = null;

  /**
   * Creates the darkening overlay element
   */
  const createOverlay = () => {
    overlay = document.createElement('div');
    overlay.id = 'idle-overlay';
    Object.assign(overlay.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      width: '100vw',
      height: '100vh',
      backgroundColor: 'black',
      opacity: '0',
      pointerEvents: 'none',
      transition: 'opacity 2s ease',
      zIndex: '9999'
    });
    document.body.appendChild(overlay);
  };

  /**
   * Updates the last input timestamp and resets screen brightness
   */
  const handleInput = () => {
    lastInputTime = Date.now();
    if (overlay && overlay.style.opacity !== '0') {
      overlay.style.opacity = '0';
    }
  };

  /**
   * Logic loop to check if the idle threshold has been reached
   */
  const checkIdleStatus = () => {
    const currentTime = Date.now();
    const timeElapsed = currentTime - lastInputTime;

    if (timeElapsed >= IDLE_TIMEOUT) {
      if (overlay && overlay.style.opacity === '0') {
        // Darken the screen (adjust 0.7 for preferred darkness level)
        overlay.style.opacity = '0.7';
      }
    }

    requestAnimationFrame(checkIdleStatus);
  };

  /**
   * Initializes the system
   */
  const init = () => {
    createOverlay();
    window.addEventListener('keydown', handleInput);
    
    // Optional: Include mouse movement or clicks as input
    // window.addEventListener('mousemove', handleInput);
    // window.addEventListener('mousedown', handleInput);

    requestAnimationFrame(checkIdleStatus);
  };

  return { init };
})();

// Start the system when the DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', LastInputSystem.init);
} else {
  LastInputSystem.init();
}
