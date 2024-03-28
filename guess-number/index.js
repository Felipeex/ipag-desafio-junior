const readline = require("node:readline");
const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function guesseNumber() {
  const randomNumber = Math.floor(Math.random() * 100);
  prompt.question("Adivinhe o número de 0 a 100 (EX: 1): \n", (response) => {
    const guessedNumber = Number(response);

    if (guessedNumber === randomNumber) {
      console.log("Acertou!!!");
    } else if (guessedNumber > randomNumber) {
      console.log("Seu número está acima.");
    } else console.log("Seu número está abaixo.");

    guesseNumber();
  });
}
guesseNumber();
