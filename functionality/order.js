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

    // await sequelize.query(`SELECT destinations.name,price,period,transports.transportName FROM mains    inner JOIN transports ON transport = transports.id
    // inner Join destinations on place=destinations.id`).spread((results, metadata) => {
    //     innerTable = results;

    // });
    if (command == 'place') {

        await sequelize.query(`SELECT destinations.name,price,period,transports.transportName FROM mains    inner JOIN transports ON transport = transports.id
    inner Join destinations on place=destinations.id order by name`).spread((results, metadata) => {
            innerTable = results;
        });
        header();
        innerTable.forEach((row) => {
            let answer = row.name + freeSpace + freeSpace + row.transportName + freeSpace + row.price + ' лв' + freeSpace + row.period
            console.log(answer);
            console.log(('-').repeat(110));

        });
    }
    if (command == 'transport') {
        await sequelize.query(`SELECT destinations.name,price,period,transports.transportName FROM mains    inner JOIN transports ON transport = transports.id
    inner Join destinations on place=destinations.id order by transportName`).spread((results, metadata) => {
            innerTable = results;
        });
        header();
        innerTable.forEach((row) => {
            let answer = row.transportName + freeSpace + row.name + freeSpace + freeSpace + row.price + ' лв' + freeSpace + row.period
            console.log(answer);
            console.log(('-').repeat(110));

        });
    }
    if (command == 'price' && argument == 'asc') {
        await sequelize.query(`SELECT destinations.name,price,period,transports.transportName FROM mains    inner JOIN transports ON transport = transports.id
        inner Join destinations on place=destinations.id order by price`).spread((results, metadata) => {
            innerTable = results;
        });
        header();
        innerTable.forEach((row) => {
            let answer = row.name + freeSpace + freeSpace + row.transportName + freeSpace + row.price + ' лв' + freeSpace + row.period
            console.log(answer);
            console.log(('-').repeat(110));
        });
    }
    if (command == 'price' && argument == 'desc') {
        await sequelize.query(`SELECT destinations.name,price,period,transports.transportName FROM mains    inner JOIN transports ON transport = transports.id
        inner Join destinations on place=destinations.id order by price desc`).spread((results, metadata) => {
            innerTable = results;
        });
        header();
        innerTable.forEach((row) => {
            let answer = row.name + freeSpace + freeSpace + row.transportName + freeSpace + row.price + ' лв' + freeSpace + row.period
            console.log(answer);
            console.log(('-').repeat(110));
        });
    }
}
try {
    innerJoin(command, argument);
} catch (error) {
    console.log('Found error!');
}