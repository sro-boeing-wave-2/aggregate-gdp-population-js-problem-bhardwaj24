/**
 * Aggregates GDP and Population Data by Continents
 * @param {*} filePath
 */
const fs = require('fs');
const country = require('./data/country-continent.json');

const task1 = function () {
  return new Promise((resolve) => {
    fs.readFile('./data/datafile.csv', 'utf-8', (err, data) => {
      const sheet1rows = data.split('\n');
      for (let j = 0; j < sheet1rows.length; j += 1) {
        sheet1rows[j] = sheet1rows[j].replace(/"/g, '');
        sheet1rows[j] = sheet1rows[j].split(',');
      }
      resolve(sheet1rows);
    });
  });
};
const aggregate = () => new Promise((resolve) => {
  task1().then((values) => {
    const sheet1rows = values;
    const header = sheet1rows[0];
    const population = header.indexOf('Population (Millions) - 2012');
    const Gdp = header.indexOf('GDP Billions (US Dollar) - 2012');
    // var country_name = header.indexOf("Country Name");
    const json = {};
    for (let i = 1; i < sheet1rows.length - 2; i += 1) {
      if (json[country[sheet1rows[i][0]]] === undefined) {
        json[country[sheet1rows[i][0]]] = {};
        json[country[sheet1rows[i][0]]].GDP_2012 = parseFloat(sheet1rows[i][Gdp]);
        json[country[sheet1rows[i][0]]].POPULATION_2012 = parseFloat(sheet1rows[i][population]);
      } else {
        json[country[sheet1rows[i][0]]].GDP_2012 += parseFloat(sheet1rows[i][Gdp]);
        json[country[sheet1rows[i][0]]].POPULATION_2012 += parseFloat(sheet1rows[i][population]);
      }
    }
    fs.writeFile('./output/output.json', JSON.stringify(json), 'utf-8', (err, data) => {
      resolve(data);
    });
  });
});


module.exports = aggregate;
