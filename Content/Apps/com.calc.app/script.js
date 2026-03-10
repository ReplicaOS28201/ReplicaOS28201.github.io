const display = document.getElementById("display");
const historyList = document.getElementById("history");

let history = [];

function add(value) {
  display.value += value;
}

function clearDisplay() {
  display.value = "";
}

function backspace() {
  display.value = display.value.slice(0, -1);
}

function percent() {
  display.value = parseFloat(display.value) / 100;
}

function square() {
  display.value = Math.pow(parseFloat(display.value), 2);
}

function sqrt() {
  display.value = Math.sqrt(parseFloat(display.value));
}

function calculate() {
  try {
    const expression = display.value;
    const result = Function("return " + expression)();

    display.value = result;

    addHistory(expression + " = " + result);

  } catch {
    display.value = "Error";
  }
}

function addHistory(entry) {
  history.unshift(entry);

  if (history.length > 10) {
    history.pop();
  }

  if (historyList) {
    historyList.innerHTML = "";

    history.forEach(item => {
      const li = document.createElement("li");
      li.textContent = item;
      historyList.appendChild(li);
    });
  }
}

document.addEventListener("keydown", (e) => {

  if (!isNaN(e.key) || "+-*/.".includes(e.key)) {
    add(e.key);
  }

  if (e.key === "Enter") {
    calculate();
  }

  if (e.key === "Backspace") {
    backspace();
  }

  if (e.key === "Escape") {
    clearDisplay();
  }
});
