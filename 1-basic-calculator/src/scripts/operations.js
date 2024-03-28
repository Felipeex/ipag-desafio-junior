let numberInput = document.getElementsByClassName("input-number")[0];
const operationsInputs = document.getElementsByClassName("operation-button");
let sum = 0;
let lastOperation = null;
let lastOperationUntilEqual = null;
let isNotFirstOperation = false;

for (const button of operationsInputs) {
  handleButtonFocusedWithClick(button);
}

export function setOperator(operatorClass) {
  const operatorInput = document.getElementsByClassName(operatorClass)[0];
  setButtonFocused(operatorInput);
}

export function removeOperator() {
  if (lastOperation && lastOperation.className.includes("focused"))
    lastOperation.classList.remove("focused");

  lastOperation = null;
  lastOperationUntilEqual = null;
  isNotFirstOperation = false;
}

function setButtonFocused(button) {
  handleLastOperation(button);

  if (button.classList[1] !== "equal") {
    lastOperationUntilEqual = button.classList[1];
    if (!isNotFirstOperation) {
      sum += Number(numberInput.value);
    }

    numberInput.value = "";
    isNotFirstOperation = true;
  } else {
    switch (lastOperationUntilEqual) {
      case "addition":
        sum += Number(numberInput.value);
        break;
      case "subtraction":
        sum -= Number(numberInput.value);
        break;
      case "division":
        sum /= Number(numberInput.value);
        break;
      case "multiplication":
        sum *= Number(numberInput.value);
        break;

      default:
        break;
    }

    numberInput.value = sum;
  }
}

function handleButtonFocusedWithClick(button) {
  button.addEventListener("click", () => {
    handleLastOperation(button);
  });
}
function handleLastOperation(button) {
  if (lastOperation && lastOperation.className.includes("focused"))
    lastOperation.classList.remove("focused");

  lastOperation = button;
  lastOperation.classList.add("focused");
}
