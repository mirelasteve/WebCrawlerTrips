const command = process.argv[2];
const argument = process.argv[3];
const header = require('./headerTable.js')
const Sequelize = require('sequelize');
const sequelize = new Sequelize('webCrawlerDestinations', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
});
const jsdom = require('jsdom');
const {
    JSDOM
} = jsdom;
const $init = require('jquery');
const db = require('../models');
const {
    mains,
    destinations,
    transports
} = db;

let innerTable;
const innerJoin = async(command, argument) => {
    const freeSpace = ' '.repeat(15);

    await sequelize.query(`SELECT destinations.name,price,period,transports.transportName FROM mains    inner JOIN transports ON transport = transports.id
    inner Join destinations on place=destinations.id`).spread((results, metadata) => {
        innerTable = results;

    });
    if (command == 'place') {
        header();
        // console.log('МЯСТО ', '   НОЩУВКИ', '       ЦЕНА', '  ТРАНСПОРТ');
        innerTable.forEach((row) => {
            if (row.name == argument) {

                let answer = row.name + freeSpace + freeSpace + row.transportName + freeSpace + row.price + ' лв' + freeSpace + row.period
                console.log(answer);
                console.log(('-').repeat(110));
            }
        });
    }
    if (command == 'transport') {
        header();
        innerTable.forEach((row) => {
            if (row.transportName == argument) {

                let answer = row.transportName + freeSpace + row.name + freeSpace + freeSpace + row.price + ' лв' + freeSpace + row.period
                console.log(answer);
                console.log(('-').repeat(110));
            }
        });
    }
    if (command == 'price') {
        header();
        innerTable.forEach((row) => {
            if (row.price == argument) {
                let answer = row.name + freeSpace + freeSpace + row.transportName + freeSpace + row.price + ' лв' + freeSpace + row.period
                console.log(answer);
                console.log(('-').repeat(110));
            }
        });
    }
}
try {
    innerJoin(command, argument);
} catch (error) {
    console.log('Found error!');
}