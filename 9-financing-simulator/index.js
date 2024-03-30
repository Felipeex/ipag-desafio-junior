const readline = require("node:readline");
const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

(function () {
  AskFinanceValue();
})();

function AskFinanceValue() {
  prompt.question("Forneça o valor do financiamento (EX: 1000): ", (value) => {
    const financingValue = Number(value);
    AskQuantityOfInstallments(financingValue);
  });
}

function AskQuantityOfInstallments(financingValue) {
  prompt.question("Forneça a quantidade de parcelas (EX: 12): ", (value) => {
    const installments = Number(value);
    AskTaxPerYear(financingValue, installments);
  });
}

function AskTaxPerYear(financingValue, installments) {
  prompt.question(
    "Forneça a taxa nominal de juros anual. (EX: 10.65): ",
    (value) => {
      prompt.close();
      const taxPerYear = Number(value);

      const installmentsValue = InstallmentsValue(
        financingValue,
        taxPerYear / 12,
        installments
      );

      const totalEffectiveCust = TotalEffectiveCust(
        installmentsValue,
        financingValue,
        installments
      );

      const monthEffectiveTax = MonthEffectiveTax(taxPerYear);

      console.log("Valor da parcela:", installmentsValue);
      console.log("Custo efetivo total: ", totalEffectiveCust);
      console.log("Taxa efetiva mensal: ", monthEffectiveTax);
    }
  );
}

function InstallmentsValue(financingValue, taxPerMonth, installments) {
  return (
    financingValue *
    (taxPerMonth / ((1 - (1 + taxPerMonth)) ^ -installments))
  ).toFixed(2);
}

function TotalEffectiveCust(installmentsValue, financingValue, installments) {
  return installmentsValue * installments - financingValue;
}

function MonthEffectiveTax(taxPerYear) {
  return (1 + taxPerYear) ^ (1 / 12 - 1);
}
