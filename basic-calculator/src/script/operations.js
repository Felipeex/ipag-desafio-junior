const operationsInputs = document.getElementsByClassName("operation-button");
const additionInput = document.getElementsByClassName("addition")[0];
const subtractionInput = document.getElementsByClassName("subtraction")[0];
const divisionInput = document.getElementsByClassName("division")[0];
const multiplicationInput =
  document.getElementsByClassName("multiplication")[0];
const equalInput = document.getElementsByClassName("equal")[0];

let lastOperation;

for (const button of operationsInputs) {
  button.addEventListener("click", () => {
    if (lastOperation && lastOperation.className.includes("focused"))
      lastOperation.classList.remove("focused");

    lastOperation = button;
    lastOperation.classList.add("focused");
  });
}
