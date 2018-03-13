'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        'destinations',
        ['name'],
        {
            type: 'unique',
            name: 'custom_unique_constraint_name'
        };
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('mains');
    }
};