const display = document.getElementById("display");
const historyList = document.getElementById("history");

let history = [];

// ✅ Reset safely if display is broken
function normalizeDisplay() {
  if (display.value === "Error" || display.value === "Infinity") {
    display.value = "";
  }
}

// ✅ Clean expression (fix glitches)
function sanitize(expr) {
  return expr
    .replace(/[^0-9+\-*/.^()%]/g, "")   // remove junk
    .replace(/(\.\.)+/g, ".")           // fix double dots
    .replace(/([+\-*/^]){2,}/g, "$1")   // fix double operators
    .replace(/^([*/^])/, "");           // no invalid start
}

function add(value) {
  normalizeDisplay();

  let newValue = display.value + value;
  newValue = sanitize(newValue);

  display.value = newValue;
}

function clearDisplay() {
  display.value = "";
}

function backspace() {
  normalizeDisplay();
  display.value = display.value.slice(0, -1);
}

function safeEval(expr) {
  if (!expr) return 0;

  expr = sanitize(expr);

  // Replace ^ with **
  expr = expr.replace(/\^/g, "**");

  try {
    const result = eval(expr);

    if (!isFinite(result)) throw "Math error";

    return result;
  } catch {
    throw "Error";
  }
}

function percent() {
  try {
    const val = safeEval(display.value);
    display.value = String(val / 100);
  } catch {
    display.value = "Error";
  }
}

function square() {
  try {
    const val = safeEval(display.value);
    display.value = String(val ** 2);
  } catch {
    display.value = "Error";
  }
}

function sqrt() {
  try {
    const val = safeEval(display.value);
    if (val < 0) throw "Invalid";
    display.value = String(Math.sqrt(val));
  } catch {
    display.value = "Error";
  }
}

function calculate() {
  try {
    const expression = display.value;
    const result = safeEval(expression);

    display.value = result;
    addHistory(expression + " = " + result);

  } catch {
    display.value = "Error";
  }
}

function addHistory(entry) {
  history.unshift(entry);

  if (history.length > 10) history.pop();

  if (historyList) {
    historyList.innerHTML = "";

    history.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;

      // ✅ Safe reuse
      li.onclick = () => {
        display.value = item.split("=")[0].trim();
      };

      historyList.appendChild(li);
    });
  }
}

// ✅ STRONG keyboard protection
document.addEventListener("keydown", (e) => {
  if (e.ctrlKey || e.metaKey) return;

  const key = e.key;

  if (/^[0-9]$/.test(key) || "+-*/.^()".includes(key)) {
    e.preventDefault();
    add(key);
  }

  if (key === "Enter") {
    e.preventDefault();
    calculate();
  }

  if (key === "Backspace") {
    e.preventDefault();
    backspace();
  }

  if (key === "Escape") {
    clearDisplay();
  }
});
