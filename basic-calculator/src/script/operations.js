let numberInput = document.getElementsByClassName("input-number")[0];
const operationsInputs = document.getElementsByClassName("operation-button");
let sum = 0;
let lastOperation = null;
let lastOperationUntilEqual = null;

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
  sum = 0;
}

function setButtonFocused(button) {
  handleLastOperation(button);
  handleSum(button.classList[1], Number(numberInput.value));
  numberInput.value = "";

  if (button.classList[1] === "equal") numberInput.value = sum;
}

function handleButtonFocusedWithClick(button) {
  button.addEventListener("click", () => {
    handleLastOperation(button);
    handleSum(button.classList[1], Number(numberInput.value));
    numberInput.value = "";

    if (button.classList[1] === "equal") numberInput.value = sum;
  });
}

function handleSum(operation, value) {
  switch (operation) {
    case "addition":
      sum += value;
      break;
    case "equal":
      handleSum(
        lastOperationUntilEqual && lastOperationUntilEqual.classList[1],
        value
      );
      break;
  }
}

function handleLastOperation(button) {
  if (lastOperation && lastOperation.className.includes("focused"))
    lastOperation.classList.remove("focused");

  if (
    button &&
    button.classList[1] === "equal" &&
    lastOperation &&
    lastOperation.classList[1] !== "equal"
  ) {
    lastOperationUntilEqual = lastOperation;
  }

  lastOperation = button;
  lastOperation.classList.add("focused");
}
