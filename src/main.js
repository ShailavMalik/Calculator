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

let output = 0;
let displayInput = "";

document.addEventListener("keydown", (e) => {
  calcInput.focus();
});

calcInput.addEventListener("input", (e) => {
  // allow only numberic keys & operators

  displayInput = calcInput.value;

  // remove concurrent operators except '-'

  // expression should start start with number except '-'

  calcInput.value = displayInput;
});

equalto.addEventListener("click", () => {
  output = calculateExpression(displayInput);
  calcOutput.textContent = output; // here show answer
  ans_div.classList.remove("hidden");
});

back.addEventListener("click", () => {
  displayInput = displayInput.slice(0, -1);
  calcInput.value = displayInput;
});

clear.addEventListener("click", (e) => {
  ans_div.classList.add("hidden");
  displayInput = "";
  calcInput.value = displayInput; // update the dom
  output = 0;
  calcOutput.innerText = output;
});

numbericButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    calcInput.value += e.target.value;
    displayInput = calcInput.value;
  });
});

operationButtons.forEach((button) => {
  button.addEventListener("click", (e) => {
    calcInput.value += e.target.value;
    displayInput = calcInput.value;
  });
});
