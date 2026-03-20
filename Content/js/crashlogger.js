const CrashLogger = {
  logs: [],

  log(error, source = "system", fatal = false) {
    const entry = {
      id: Date.now(),
      time: new Date().toLocaleString(),
      source,
      message: error?.message || error,
      stack: error?.stack || "no stack",
      fatal
    };

    this.logs.push(entry);
    this.save();

    console.error("💥 Crash:", entry);

    if (fatal) {
      this.showBSOD(entry);
    } else {
      this.showCrashWindow(entry);
    }
  },

  save() {
    localStorage.setItem("19os_crash_logs", JSON.stringify(this.logs));
  },

  load() {
    this.logs = JSON.parse(localStorage.getItem("19os_crash_logs") || "[]");
  },

  clear() {
    this.logs = [];
    this.save();
  },

  showCrashWindow(entry) {
    const crashBox = document.createElement("div");
    crashBox.className = "crash-window";

    crashBox.innerHTML = `
      <div class="crash-title">⚠️ App Crashed</div>
      <div class="crash-content">
        <b>App:</b> ${entry.source}<br>
        <b>Time:</b> ${entry.time}<br>
        <b>Error:</b> ${entry.message}
      </div>
      <button onclick="this.parentElement.remove()">Close</button>
    `;

    document.body.appendChild(crashBox);
  },

  showBSOD(entry) {
    document.body.innerHTML = `
      <div class="bsod">
        <h1>💻 19OS ran into a problem</h1>
        <p>We’re collecting error info...</p>
        <p><b>${entry.message}</b></p>
        <br>
        <p>Source: ${entry.source}</p>
        <p>Time: ${entry.time}</p>
        <br>
        <p>Reload the system to continue.</p>
      </div>
    `;
  }
};

// Load logs on boot
CrashLogger.load();
