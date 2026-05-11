// ===============================
// 🔌 19OS PLUGIN SYSTEM
// ===============================

const PLUGIN_STORAGE_KEY = "19os_plugins";
const THEME_STORAGE_KEY = "replicaos_theme_studio";
const SETTINGS_STORAGE_KEY = "replicaos_control_center";

function sendPluginNotice(message) {
  if (typeof window.notify === "function") {
    window.notify(message);
  }
}

function readStoredJson(key, fallback) {
  const raw = localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    return JSON.parse(raw);
  } catch (error) {
    console.warn("Resetting invalid stored ReplicaOS data", key, error);
    localStorage.removeItem(key);
    return fallback;
  }
}

function escapePluginHtml(value) {
  return String(value).replace(/[&<>"]/g, character => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;"
  }[character]));
}

function applyReplicaTheme(theme = readStoredJson(THEME_STORAGE_KEY, null)) {
  if (!theme) return;

  const root = document.documentElement;
  if (theme.accent) root.style.setProperty("--replica-accent", theme.accent);
  if (theme.glass) root.style.setProperty("--glass-bg", theme.glass);
  if (theme.border) root.style.setProperty("--glass-border", theme.border);
  if (theme.radius) root.style.setProperty("--radius", theme.radius + "px");
  if (theme.blur) root.style.setProperty("--blur", theme.blur + "px");
  if (theme.wallpaper) document.body.style.background = theme.wallpaper;
}

function applyReplicaSettings(settings = readStoredJson(SETTINGS_STORAGE_KEY, null)) {
  if (!settings) return;

  document.body.dataset.replicaCompactDock = settings.compactDock ? "true" : "false";
  document.body.dataset.replicaReduceMotion = settings.reduceMotion ? "true" : "false";
  document.body.dataset.replicaHighContrast = settings.highContrast ? "true" : "false";
  document.documentElement.style.setProperty("--replica-window-scale", settings.windowScale || "1");
}

const PluginSystem = {
  plugins: readStoredJson(PLUGIN_STORAGE_KEY, []),

  save() {
    localStorage.setItem(PLUGIN_STORAGE_KEY, JSON.stringify(this.plugins));
  },

  install(plugin) {
    if (!plugin || !plugin.id || !plugin.name || !plugin.url || !/^[A-Za-z0-9_-]+$/.test(plugin.id)) {
      console.error("Invalid plugin format");
      return;
    }

    // prevent duplicates
    if (this.plugins.find(p => p.id === plugin.id)) {
      sendPluginNotice("⚠️ Plugin already installed");
      return;
    }

    this.plugins.push(plugin);
    this.save();

    this.render(plugin);
    sendPluginNotice("✅ Installed: " + plugin.name);
  },

  uninstall(id) {
    this.plugins = this.plugins.filter(p => p.id !== id);
    this.save();

    document.getElementById("plugin-" + id)?.remove();
    document.getElementById("dock-" + id)?.remove();

    sendPluginNotice("🗑️ Uninstalled: " + id);
  },

  loadAll() {
    this.plugins.forEach(p => this.render(p));
  },

  render(plugin) {
    createPluginWindow(plugin);
    createPluginDockIcon(plugin);
  }
};

window.PluginSystem = PluginSystem;
window.applyReplicaTheme = applyReplicaTheme;
window.applyReplicaSettings = applyReplicaSettings;

// ===============================
// 🪟 CREATE PLUGIN WINDOW
// ===============================
function createPluginWindow(plugin) {
  if (document.getElementById("plugin-" + plugin.id)) return;

  const win = document.createElement("div");
  win.className = "appwindow hidden";
  win.id = "plugin-" + plugin.id;

  const safeName = escapePluginHtml(plugin.name);
  const safeUrl = escapePluginHtml(plugin.url);
  const closeAction = typeof window.closeWindow === "function"
    ? `closeWindow('plugin-${plugin.id}')`
    : `document.getElementById('plugin-${plugin.id}').classList.add('hidden')`;

  win.innerHTML = `
    <div class="resize-handle resize-br"></div>
    <div class="resize-handle resize-r"></div>
    <div class="resize-handle resize-b"></div>

    <div class="window-titlebar">
      <span>${safeName}</span>
      <button onclick="${closeAction}">×</button>
    </div>

    <iframe src="${safeUrl}" class="window-content" title="${safeName}"></iframe>
  `;

  document.body.appendChild(win);

  // hook into your existing system (if present)
  if (typeof window.makeDraggable === "function") window.makeDraggable(win);
  if (typeof window.makeResizable === "function") window.makeResizable(win);
}

// ===============================
// 🚀 CREATE DOCK ICON
// ===============================
function createPluginDockIcon(plugin) {
  if (document.getElementById("dock-" + plugin.id)) return;

  const dock = document.querySelector(".dock");
  if (!dock) return;

  const btn = document.createElement("button");
  btn.className = "dock-icon";
  btn.id = "dock-" + plugin.id;
  btn.innerText = plugin.icon || "📦";
  btn.title = plugin.name;

  btn.onclick = () => {
    if (typeof window.openWindow === "function") {
      window.openWindow("plugin-" + plugin.id);
      return;
    }

    document.getElementById("plugin-" + plugin.id)?.classList.remove("hidden");
  };

  dock.appendChild(btn);
}

window.addEventListener("message", event => {
  const message = event.data;
  if (!message || typeof message !== "object" || !message.type) return;

  if (message.type === "replicaos:theme") {
    localStorage.setItem(THEME_STORAGE_KEY, JSON.stringify(message.payload));
    applyReplicaTheme(message.payload);
    sendPluginNotice("🎨 Theme applied");
  }

  if (message.type === "replicaos:settings") {
    localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(message.payload));
    applyReplicaSettings(message.payload);
    sendPluginNotice("⚙️ Settings applied");
  }
});

// ===============================
// 🚀 AUTO LOAD ON START
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  applyReplicaTheme();
  applyReplicaSettings();
  PluginSystem.loadAll();
});
