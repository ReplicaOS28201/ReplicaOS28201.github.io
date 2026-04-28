(function (global) {
  const logs = [];

  function writeLog(type, app, data) {
    const entry = {
      time: new Date().toISOString(),
      type,
      app,
      data: data ?? null,
    };

    logs.push(entry);
    return entry;
  }

  global.System = {
    open(app) {
      return writeLog('open', app);
    },
    send(app, data) {
      return writeLog('send', app, data);
    },
    getLogs() {
      return [...logs];
    },
  };
})(window);
