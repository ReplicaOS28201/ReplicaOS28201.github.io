// ===============================
// 🔒 SYSTEM UPDATE LOCK (MANUAL)
// ===============================

let updateState = {
  started: false,
  progress: 0,
  interval: null
};

// -------------------------------
// 🔒 LOCK SCREEN (NO PROGRESS)
// -------------------------------
function showUpdateScreen() {
  if (document.getElementById("systemUpdateLock")) return;

  const overlay = document.createElement("div");
  overlay.id = "systemUpdateLock";

  overlay.innerHTML = `
    <div class="update-box">
      <h1>System Update</h1>
      <p id="updateText">Waiting to check for updates...</p>

      <div class="bar">
        <div id="barFill"></div>
      </div>

      <span id="percent">0%</span>
    </div>
  `;

  document.body.appendChild(overlay);
  document.body.style.overflow = "hidden";
}

// -------------------------------
// 🔍 START CHECK (YOU CONTROL THIS)
// -------------------------------
function startUpdateCheck() {
  if (updateState.started) return;

  updateState.started = true;

  const text = document.getElementById("updateText");
  const bar = document.getElementById("barFill");
  const percent = document.getElementById("percent");

  const stages = [
    "Checking for updates...",
    "Downloading...",
    "Installing...",
    "Optimizing...",
    "Finishing..."
  ];

  updateState.interval = setInterval(() => {
    updateState.progress += Math.random() * 6;

    if (updateState.progress >= 100) {
      updateState.progress = 100;
      clearInterval(updateState.interval);

      text.innerText = "Restarting...";
      bar.style.width = "100%";
      percent.innerText = "100%";

      setTimeout(finishUpdate, 2000);
      return;
    }

    // Update UI
    bar.style.width = updateState.progress + "%";
    percent.innerText = Math.floor(updateState.progress) + "%";

    const stageIndex = Math.floor((updateState.progress / 100) * stages.length);
    text.innerText = stages[stageIndex];

  }, 200);
}

// -------------------------------
// 🔄 FINISH
// -------------------------------
function finishUpdate() {
  const overlay = document.getElementById("systemUpdateLock");
  if (overlay) overlay.remove();

  document.body.style.overflow = "";

  location.reload();
}
