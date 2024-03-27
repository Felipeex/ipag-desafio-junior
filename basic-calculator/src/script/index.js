import "./operations.js";

const accepttedInputKeys = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  /* "+",
  "-",
  "=",
  "/",
  "x", */
];

/* Colocar focus automaticamente ao input */
const numberInput = document.getElementsByClassName("input-number")[0];
numberInput.focus();

/* Verificar teclas clicadas, e fazer uma ação */
numberInput.onkeydown = (rest) => {
  if (accepttedInputKeys.includes(rest.key)) {
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
