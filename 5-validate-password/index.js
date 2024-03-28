const readline = require("node:readline");
const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

prompt.question("Forneça uma senha (EX: MinhaSenha1): ", (password) => {
  const validateLenght = password.match(/^[0-9a-zA-Z]{8,}$/);
  const validateLowerCase = password.match(/^.*[a-z].*$/);
  const validateUpperCase = password.match(/^.*[A-Z].*$/);
  const validateNumbers = password.match(/^.*[0-9].*$/);

  if (!validateLenght) console.log("* Senha deve ter no mínimo 8 caracteres.");

  if (!validateLowerCase)
    console.log("* Deve conter ao menos uma letra minúscula.");

  if (!validateUpperCase)
    console.log("* Deve conter ao menos uma letra maiúscula.");

  if (!validateNumbers) console.log("* Deve conter ao menos uma número.");

  if (
    validateLenght &&
    validateLowerCase &&
    validateUpperCase &&
    validateNumbers
  )
    console.log("Senha válida!");
  prompt.close();
});
