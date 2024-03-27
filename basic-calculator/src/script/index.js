/* Colocar focus automaticamente ao input */
const defaultInput = document.getElementsByClassName("input-number")[0];
defaultInput.focus();

/* Ao clicar a qualquer lugar da tela, ficara com foco no input */
const body = document.getElementsByTagName("body")[0];
body.addEventListener("click", () => {
  defaultInput.focus();
});
