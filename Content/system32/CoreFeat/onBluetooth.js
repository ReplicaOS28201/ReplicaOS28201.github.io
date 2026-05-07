// onBluetooth.js

const BluetoothChecker = (() => {
    let state = {
        supported: false,
        available: false,
        enabled: false,
        device: null,
        error: null
    };

    // Check if Web Bluetooth exists
    function checkSupport() {
        state.supported = !!navigator.bluetooth;
        return state.supported;
    }

    // Check availability (browser + device)
    async function checkAvailability() {
        if (!checkSupport()) {
            state.error = "Web Bluetooth not supported";
            return state;
        }

        try {
            state.available = await navigator.bluetooth.getAvailability();
        } catch (err) {
            state.error = err.message;
        }

        return state;
    }

    // Request a Bluetooth device (user interaction required)
    async function requestDevice() {
        if (!checkSupport()) {
            state.error = "Bluetooth not supported";
            return state;
        }

        try {
            const device = await navigator.bluetooth.requestDevice({
                acceptAllDevices: true
            });

            state.device = device;
            state.enabled = true;
        } catch (err) {
            state.error = err.message;
        }

        return state;
    }

    // Listen for Bluetooth availability changes
    function onAvailabilityChange(callback) {
        if (!navigator.bluetooth) return;

        navigator.bluetooth.addEventListener(
            'availabilitychanged',
            (event) => {
                state.available = event.value;
                callback(state);
            }
        );
    }

    // Get current state
    function getState() {
        return state;
    }

    return {
        checkSupport,
        checkAvailability,
        requestDevice,
        onAvailabilityChange,
        getState
    };
})();

// Export (for modules)
export default BluetoothChecker;
