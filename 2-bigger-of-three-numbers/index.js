const readline = require("node:readline");
const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

prompt.question("Forneça três números (EX: 1 2 3): \n", (response) => {
  const numbers = response.split(" ");

  const numberOne = Number(numbers[0]);
  const numberTwo = Number(numbers[1]);
  const numberThree = Number(numbers[2]);

  if (!numberOne || !numberTwo || !numberTwo)
    console.log("Dados incorretos...");

  if (numberOne > numberTwo && numberOne > numberThree)
    console.log(`${numberOne} é maior`);
  else if (numberTwo > numberOne && numberTwo > numberThree)
    console.log(`${numberTwo} é maior`);
  else if (numberThree > numberOne && numberThree > numberTwo)
    console.log(`${numberThree} é maior`);

  prompt.close();
});
