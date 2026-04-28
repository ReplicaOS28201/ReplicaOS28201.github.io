(function (global) {
  let mainCallback = null;
  let initialized = false;

  const Dock = {
    connectMain(fn) {
      mainCallback = fn;
    },

    init() {
      if (initialized) return true;
      const dockRoot = document.getElementById('dock-root');
      if (!dockRoot) return false;

      dockRoot.addEventListener('click', (event) => {
        const button = event.target.closest('[data-app]');
        if (!button || !mainCallback) return;

        mainCallback({
          type: 'open-app',
          app: button.dataset.app,
        });
      });

      initialized = true;
      return true;
    },

    send(app, data) {
      if (!mainCallback) return;

      mainCallback({
        type: 'send-data',
        app,
        data,
      });
    },
  };

  global.Dock = Dock;
})(window);
