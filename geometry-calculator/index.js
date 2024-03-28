const readline = require("node:readline");
const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

prompt.question(
  "Qual forma geométricas você deseja calcular sua área? \n 1 - Quadrado \n 2 - Retângulo \n 3 - Triângulo \n 4 - Círculo \n",
  (response) => {
    switch (response) {
      case "1":
        calculateSquare();
        break;
      case "2":
        calculateRectangle();
        break;
      case "3":
        calculateTriangle();
        break;
      case "4":
        calculateCircle();
        break;
    }
  }
);

function calculateSquare() {
  prompt.question("Forneça lado do Quadrado (EX: 1): ", (response) => {
    const splittedResponse = response.slice(" ");
    const side = splittedResponse[0];

    if (!side) console.log("Dados incorretos...");
    console.log(`Sua área é ${side * side}`);
    prompt.close();
  });
}

function calculateRectangle() {
  prompt.question(
    "Forneça base e altura do Retângulo (EX: 1 2): ",
    (response) => {
      const splittedResponse = response.slice(" ");
      const base = splittedResponse[0];
      const height = splittedResponse[0];

      if (!base || !height) console.log("Dados incorretos...");
      console.log(`Sua área é ${base * height}`);
      prompt.close();
    }
  );
}

function calculateTriangle() {
  prompt.question(
    "Forneça base e altura do Triângulo (EX: 1 2): ",
    (response) => {
      const splittedResponse = response.slice(" ");
      const base = splittedResponse[0];
      const height = splittedResponse[0];

      if (!base || !height) console.log("Dados incorretos...");
      console.log(`Sua área é ${(base * height) / 2}`);
      prompt.close();
    }
  );
}

function calculateCircle() {
  prompt.question("Forneça o raio Circulo (EX: 1): ", (response) => {
    const PI_VALUE = 3.14159265359;
    const splittedResponse = response.slice(" ");
    const radius = splittedResponse[0];

    if (!radius) console.log("Dados incorretos...");
    console.log(`Sua área é ${(PI_VALUE * (radius * radius)).toFixed(1)}`);
    prompt.close();
  });
}
