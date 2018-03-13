'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('transports', ['transport'], {
            type: 'unique',
            name: 'transport',

        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('mains');
    }
};