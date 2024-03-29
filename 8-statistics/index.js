const { readFileSync } = require("node:fs");
const readline = require("node:readline");
const prompt = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const salesFiles = readFileSync(`${__dirname}/sales.csv`, {
  encoding: "utf-8",
});

/* Separando itens na quebra de linha, para ficar me formato de coluna */
const splitInColumns = salesFiles.split("\r\n");

const countries = [];
const regions = [];
const types = [];
const sales = [];

/* Percorrendo todas as colunas */
for (const colunm of splitInColumns) {
  /* Separando tabelas da coluna */
  const splitInInformations = colunm.split(",");
  /* Pegando cada informação pelo indice */
  const region = splitInInformations[0];
  const country = splitInInformations[1];
  const itemType = splitInInformations[2];
  const unitsSold = splitInInformations[8];
  const totalRevenue = splitInInformations[11];
  const totalCost = splitInInformations[12];
  const totalProfit = splitInInformations[13];

  /* Anotando todas regiões sem repetir */
  if (!regions.find((otherRegion) => otherRegion === region))
    regions.push(region);

  /* Anotando todas regiões sem repetir */
  if (!countries.find((otherCountry) => otherCountry === country))
    countries.push(country);

  types.push(itemType);
  sales.push({
    region,
    country,
    itemType,
    unitsSold,
    totalRevenue,
    totalCost,
    totalProfit,
  });
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

function SalesPerTypeOfProductsAndRegion() {
  for (const region of regions) {
    const findSalesInRegion = sales.filter((sale) => sale.region === region);

    const typesInRegion = [];
    for (const sale of findSalesInRegion) {
      if (!typesInRegion.find((type) => type === sale.itemType))
        typesInRegion.push(sale.itemType);
    }

    console.log(`\n${region}`);
    for (const type of typesInRegion) {
      const findSalesPerTypeOnRegion = findSalesInRegion.filter(
        (sale) => sale.itemType === type
      );

      let TotalUnitsSoldPerRegion = 0;
      for (const salePerType of findSalesPerTypeOnRegion) {
        TotalUnitsSoldPerRegion += Number(salePerType.unitsSold);
      }

      console.log(`- ${type} = ${TotalUnitsSoldPerRegion} Vendas`);
    }
  }
}

function typeOfProductsWithMoreRevenuePerCountry() {
  for (const country of countries) {
    const findSalesInCountry = sales.filter((sale) => sale.country === country);

    const typesInCountry = [];
    for (const sale of findSalesInCountry) {
      if (!typesInCountry.find((type) => type === sale.itemType))
        typesInCountry.push(sale.itemType);
    }

    let totalRenuvePerTypeInCountry = [];
    for (const type of typesInCountry) {
      const findSalesPerTypeOnRegion = findSalesInCountry.filter(
        (sale) => sale.itemType === type
      );

      let TotalRenuvePerType = 0;
      for (const salePerType of findSalesPerTypeOnRegion) {
        TotalRenuvePerType += Number(salePerType.unitsSold);
      }

      if (totalRenuvePerTypeInCountry) {
        totalRenuvePerTypeInCountry = [
          ...totalRenuvePerTypeInCountry,
          {
            type,
            TotalRenuvePerType,
          },
        ];
      } else {
        totalRenuvePerTypeInCountry = [
          {
            type,
            TotalRenuvePerType,
          },
        ];
      }
    }

    let biggerRenuveType = null;
    let biggerRenuveValue = 0;
    totalRenuvePerTypeInCountry.forEach(({ type, TotalRenuvePerType }) => {
      if (TotalRenuvePerType > biggerRenuveValue) {
        biggerRenuveType = type;
        biggerRenuveValue = TotalRenuvePerType;
      }
    });

    console.log(
      `${country}\n - Tipo: ${biggerRenuveType}\n - Receita: ${biggerRenuveValue}`
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
          SalesPerTypeOfProductsAndRegion();
          break;
        case 3:
          typeOfProductsWithMoreRevenuePerCountry();
          break;
      }
      prompt.close();
    }
  );
})();
