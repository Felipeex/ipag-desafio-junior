const readline = require("node:readline");
const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Tv {
  id = 0;
  model = null;
  isOn = false;

  constructor(id, model, isOn) {
    this.id = id;
    this.model = model;
    this.isOn = isOn || false;
  }

  set isOn(isOn) {
    this.isOn = isOn;
  }

  get isOn() {
    return this.isOn;
  }

  get model() {
    return this.model;
  }

  get id() {
    return this.id;
  }
}

class Control {
  id = 0;
  model = null;

  constructor(id, model) {
    this.id = id;
    this.model = model;
  }

  get model() {
    return this.model;
  }

  get id() {
    return this.id;
  }
}

const models = ["Samsung", "Lg", "Sony"];
class Communication {
  Controls = [];
  Tvs = [];
  currentControl = null;

  constructor() {
    models.forEach((model, index) => {
      const id = index + 1;
      this.Controls[id] = new Control(id, model);
      this.Tvs[id] = new Tv(id, model);
    });
  }

  selectControl(controlId) {
    this.currentControl = this.Controls[controlId];
  }

  communicationOnTv(tvId) {
    if (!this.currentControl)
      return console.log("Error: Controle não encontrado.");
    const selectedTv = this.Tvs[tvId];

    if (this.currentControl.model !== selectedTv.model)
      return console.log("Error: Controle não compatível.");

    selectedTv.isOn = !selectedTv.isOn;

    if (selectedTv.isOn)
      console.log(`Sucesso: a Tv ${selectedTv.model} foi ligada!`);
    else console.log(`Sucesso: a Tv ${selectedTv.model} foi desligada!`);
  }
}

const communation = new Communication();
function choseControl() {
  prompt.question(
    `Escolha um dos controles remotos (EX: 1): ${communation.Controls.map(
      ({ id, model }) => {
        return `\n${id} - Controle ${model}`;
      }
    ).join("")}\n`,
    (response) => {
      communation.selectControl(response);
      choseTv();
    }
  );
}
choseControl();

function choseTv() {
  prompt.question(
    `Escolha uma tv para comunicação (EX: 1): ${communation.Tvs.map(
      ({ id, model, isOn }) => {
        return `\n${id} - Tv ${model} (Status: ${
          isOn ? "Ligada" : "Desligada"
        })`;
      }
    ).join("")}\n`,
    (response) => {
      communation.communicationOnTv(response);
      restart();
    }
  );
}

function restart() {
  prompt.question("Enter para retornar ao menu de Controles \n", () => {
    choseControl();
  });
}
