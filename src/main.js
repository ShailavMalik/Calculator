import calculateExpression from "./calculation";

const calcInput = document.getElementById("calc-input");
const calcOutput = document.getElementById("calc-output");

// calculator keys
const equalto = document.getElementById("equalto");
const ans_div = document.querySelector(".ans_div");
const clear = document.getElementById("clear");
const back = document.getElementById("back");
const numbericButtons = document.querySelectorAll(".num_btn");
const operationButtons = document.querySelectorAll(".op_btn");
const sound = document.getElementById("button_sound");

let output = 0;
let displayInput = "";
let clearFlag = false;

// highlight numeric keys on screen when key is pressed on keyboard
function highlightNumButton(key) {
  numbericButtons.forEach((button) => {
    if (button.value == key) {
      button.click();
      button.blur();
      button.preventDefault();
    }
  });
}

// highlight Operation keys on screen when key is pressed on keyboard
function highlightOpButton(key) {
  if (key == "*") document.getElementById("mul").click();
  else if (key == "/") document.getElementById("div").click();
  else if (key == "+") document.getElementById("add").click();
  else if (key == "-") document.getElementById("sub").click();
  else if (key == "^") document.getElementById("exp").click();
}

document.addEventListener("keydown", (e) => {
  calcInput.focus();
  const key = e.key;
  if ((key >= 0 && key <= 9) || key == ".")
    highlightNumButton(key); // simulate key press on screen for numberic keys
  else if (key == "Enter") {
    e.preventDefault();
    document.getElementById("equalto").click();
  } else if (key == "Backspace") document.getElementById("clear").click();
  else highlightOpButton(key);
});

calcInput.addEventListener("input", (e) => {
  displayInput = calcInput.value;
  calcInput.value = displayInput;

  if (clearFlag == true) {
    displayInput = "";
    calcInput.value = displayInput;
    clearFlag = false;
  }
});

equalto.addEventListener("click", () => {
  output = calculateExpression(displayInput);
  calcOutput.textContent = output; // here show answer
  ans_div.classList.remove("hidden");
  sound.currentTime = 0; //rewind to start
  sound.play();
  clearFlag = true;
});

back.addEventListener("click", () => {
  displayInput = displayInput.slice(0, -1);
  calcInput.value = displayInput;
  sound.currentTime = 0; //rewind to start
  sound.play();
});

clear.addEventListener("click", (e) => {
  ans_div.classList.add("hidden");
  displayInput = "";
  calcInput.value = displayInput; // update the dom
  output = 0;
  calcOutput.innerText = output;
  sound.currentTime = 0; //rewind to start
  sound.play();
});

numbericButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    calcInput.value += e.target.value;
    displayInput = calcInput.value;
    sound.currentTime = 0; //rewind to start
    sound.play();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    calcInput.value += e.target.value;
    displayInput = calcInput.value;
    sound.currentTime = 0; //rewind to start
    sound.play();
  });
});
