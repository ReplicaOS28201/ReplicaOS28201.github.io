// ===============================
// 🧠 19OS Focus Mode System (CORE)
// ===============================

const FocusModes = {
  current: localStorage.getItem("focusMode") || "default",

  modes: {
    default: {
      name: "Default",
      theme: "light",
      notifications: true
    },

    gaming: {
      name: "Gaming",
      theme: "dark",
      notifications: false
    },

    coding: {
      name: "Coding",
      theme: "matrix",
      notifications: false
    },

    chill: {
      name: "Chill",
      theme: "blur",
      notifications: true
    }
  },

  // ===============================
  // 🚀 APPLY MODE
  // ===============================
  apply(modeName) {
    const mode = this.modes[modeName];
    if (!mode) return;

    this.current = modeName;
    localStorage.setItem("focusMode", modeName);

    console.log("Focus Mode:", mode.name);

    this.applyTheme(mode.theme);
    this.handleNotifications(mode);
    this.dispatchEvent(mode);
  },

  // ===============================
  // 🎨 THEME SYSTEM
  // ===============================
  applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
  },

  // ===============================
  // 🔕 NOTIFICATIONS
  // ===============================
  notificationsEnabled: true,

  handleNotifications(mode) {
    this.notificationsEnabled = mode.notifications;
  },

  notify(msg) {
    if (!this.notificationsEnabled) return;

    const n = document.createElement("div");
    n.className = "notification";
    n.innerText = msg;

    document.body.appendChild(n);
    setTimeout(() => n.remove(), 3000);
  },

  // ===============================
  // 📡 EVENT SYSTEM (IMPORTANT)
  // ===============================
  dispatchEvent(mode) {
    window.dispatchEvent(new CustomEvent("focusChange", {
      detail: mode
    }));
  }
};

// ===============================
// 🎛️ GLOBAL CONTROL
// ===============================
function setFocusMode(mode) {
  FocusModes.apply(mode);
}

function getFocusMode() {
  return FocusModes.current;
}

// Auto apply on load
window.addEventListener("DOMContentLoaded", () => {
  FocusModes.apply(FocusModes.current);
});// ===============================
// 🧠 19OS Focus Mode System (CORE)
// ===============================

const FocusModes = {
  current: localStorage.getItem("focusMode") || "default",

  modes: {
    default: {
      name: "Default",
      theme: "light",
      notifications: true
    },

    gaming: {
      name: "Gaming",
      theme: "dark",
      notifications: false
    },

    coding: {
      name: "Coding",
      theme: "matrix",
      notifications: false
    },

    chill: {
      name: "Chill",
      theme: "blur",
      notifications: true
    }
  },

  // ===============================
  // 🚀 APPLY MODE
  // ===============================
  apply(modeName) {
    const mode = this.modes[modeName];
    if (!mode) return;

    this.current = modeName;
    localStorage.setItem("focusMode", modeName);

    console.log("Focus Mode:", mode.name);

    this.applyTheme(mode.theme);
    this.handleNotifications(mode);
    this.dispatchEvent(mode);
  },

  // ===============================
  // 🎨 THEME SYSTEM
  // ===============================
  applyTheme(theme) {
    document.body.setAttribute("data-theme", theme);
  },

  // ===============================
  // 🔕 NOTIFICATIONS
  // ===============================
  notificationsEnabled: true,

  handleNotifications(mode) {
    this.notificationsEnabled = mode.notifications;
  },

  notify(msg) {
    if (!this.notificationsEnabled) return;

    const n = document.createElement("div");
    n.className = "notification";
    n.innerText = msg;

    document.body.appendChild(n);
    setTimeout(() => n.remove(), 3000);
  },

  // ===============================
  // 📡 EVENT SYSTEM (IMPORTANT)
  // ===============================
  dispatchEvent(mode) {
    window.dispatchEvent(new CustomEvent("focusChange", {
      detail: mode
    }));
  }
};

// ===============================
// 🎛️ GLOBAL CONTROL
// ===============================
function setFocusMode(mode) {
  FocusModes.apply(mode);
}

function getFocusMode() {
  return FocusModes.current;
}

// Auto apply on load
window.addEventListener("DOMContentLoaded", () => {
  FocusModes.apply(FocusModes.current);
});
