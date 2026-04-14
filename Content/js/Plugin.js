// ===============================
// 🔌 19OS PLUGIN SYSTEM
// ===============================

const PluginSystem = {
  plugins: JSON.parse(localStorage.getItem("19os_plugins") || "[]"),

  save() {
    localStorage.setItem("19os_plugins", JSON.stringify(this.plugins));
  },

  install(plugin) {
    if (!plugin || !plugin.id || !plugin.name || !plugin.url) {
      console.error("Invalid plugin format");
      return;
    }

    // prevent duplicates
    if (this.plugins.find(p => p.id === plugin.id)) {
      notify?.("⚠️ Plugin already installed");
      return;
    }

    this.plugins.push(plugin);
    this.save();

    this.render(plugin);
    notify?.("✅ Installed: " + plugin.name);
  },

  uninstall(id) {
    this.plugins = this.plugins.filter(p => p.id !== id);
    this.save();

    document.getElementById("plugin-" + id)?.remove();
    document.getElementById("dock-" + id)?.remove();

    notify?.("🗑️ Uninstalled: " + id);
  },

  loadAll() {
    this.plugins.forEach(p => this.render(p));
  },

  render(plugin) {
    createPluginWindow(plugin);
    createPluginDockIcon(plugin);
  }
};

// ===============================
// 🪟 CREATE PLUGIN WINDOW
// ===============================
function createPluginWindow(plugin) {
  if (document.getElementById("plugin-" + plugin.id)) return;

  const win = document.createElement("div");
  win.className = "appwindow hidden";
  win.id = "plugin-" + plugin.id;

  win.innerHTML = `
    <div class="resize-handle resize-br"></div>
    <div class="resize-handle resize-r"></div>
    <div class="resize-handle resize-b"></div>

    <div class="window-titlebar">
      <span>${plugin.name}</span>
      <button onclick="closeWindow('plugin-${plugin.id}')">×</button>
    </div>

    <iframe src="${plugin.url}" class="window-content"></iframe>
  `;

  document.body.appendChild(win);

  // hook into your existing system (if present)
  if (typeof makeDraggable === "function") makeDraggable(win);
  if (typeof makeResizable === "function") makeResizable(win);
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

  btn.onclick = () => {
    if (typeof openWindow === "function") {
      openWindow("plugin-" + plugin.id);
    }
  };

  dock.appendChild(btn);
}

// ===============================
// 🚀 AUTO LOAD ON START
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  PluginSystem.loadAll();
});
