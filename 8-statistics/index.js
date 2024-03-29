const { readFileSync } = require("node:fs");
const readline = require("node:readline");
const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const salesFiles = readFileSync(`${__dirname}/sales.csv`, {
  encoding: "utf-8",
});

const splitInColumns = salesFiles.split("\r\n");

const types = [];
const sales = [];
for (const colunm of splitInColumns) {
  const splitInInformations = colunm.split(",");
  const itemType = splitInInformations[2];
  const unitsSold = splitInInformations[8];
  const totalRevenue = splitInInformations[11];
  const totalCost = splitInInformations[12];
  const totalProfit = splitInInformations[13];

  types.push(itemType);
  sales.push({ itemType, unitsSold, totalRevenue, totalCost, totalProfit });
}

function InformationPerTypeOfProducts() {
  for (const type of types) {
    const findSalesByType = sales.filter((sale) => sale.itemType === type);

    let totalUnitsSoldPerType = 0;
    let totalRevenuePerType = 0;
    let totalCostPerType = 0;
    let totalProfitPerType = 0;

    for (const sales of findSalesByType) {
      totalUnitsSoldPerType += Number(sales.unitsSold);
      totalRevenuePerType += Number(sales.totalRevenue);
      totalCostPerType += Number(sales.totalCost);
      totalProfitPerType += Number(sales.totalProfit);
    }

    console.log(
      `${type} \n - Total de unidades vendidas = ${totalUnitsSoldPerType} \n - Total de receita = ${totalRevenuePerType} \n - Custo total = ${totalCostPerType} \n - Cucro total = ${totalProfitPerType} \n`
    );
  }
}

(function main() {
  prompt.question(
    `O que você deseja calcular? \n 1 - Vendas (total de unidades vendidas, total de receita, custo total, lucro total) por tipo de produto. \n 2 - Vendas por tipo de produto e região. \n 3 - Tipo de produto com maior receita de cada país.\n`,
    (response) => {
      switch (Number(response)) {
        case 1:
          InformationPerTypeOfProducts();
          break;
        case 2:
          break;
        case 3:
          break;
      }
    }
  );
})();
