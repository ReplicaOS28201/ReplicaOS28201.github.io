(function (global) {
  let mainCallback = null;

  const Dock = {
    connectMain(fn) {
      mainCallback = fn;
    },

    init() {
      const dockRoot = document.getElementById('dock-root');
      if (!dockRoot) return;

      dockRoot.addEventListener('click', (event) => {
        const button = event.target.closest('[data-app]');
        if (!button || !mainCallback) return;

        mainCallback({
          type: 'open-app',
          app: button.dataset.app,
        });
      });
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
