import "./operations.js";
/* Colocar focus automaticamente ao input */
let numberInput = document.getElementsByClassName("input-number")[0];
numberInput.focus();
import { setOperator, removeOperator } from "./operations.js";

const accepttedInputKeys = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const accepttedEspecialKeys = ["+", "-", "=", "/", "x", "Backspace", "Enter"];

/* Verificar teclas clicadas, e fazer uma ação */
numberInput.onkeydown = (data) => {
  /* Poder digitar uma quantidade ilimitada por operação, e se esse digito é um número */
  if (numberInput.value.length >= 12 && accepttedInputKeys.includes(data.key))
    return false;

  if (
    accepttedInputKeys.includes(data.key) ||
    accepttedEspecialKeys.includes(data.key)
  ) {
    /* Atalhos de teclado para fazer operações */
    switch (data.key) {
      case "+":
        setOperator("addition");
        return false;
      case "-":
        setOperator("subtraction");
        return false;
      case "=":
        setOperator("equal");
        return false;
      case "Enter":
        setOperator("equal");
        return false;
      case "/":
        setOperator("division");
        return false;
      case "x":
        setOperator("multiplication");
        return false;
    }

    /* Remover operador quando apertar delete, sem nenhum número no input */
    if (numberInput.value.length <= 0 && data.key === "Backspace")
      removeOperator();

    return true;
  } else {
    return false;
  }
};

/* Ao clicar a qualquer lugar da tela, ficara com foco no input */
const body = document.getElementsByTagName("body")[0];
body.addEventListener("click", () => {
  numberInput.focus();
});
