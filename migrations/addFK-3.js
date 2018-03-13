'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('mains', ['transport'], {
            type: 'foreign key',
            name: 'custom_fkey_constraint_transport',
            references: { //Required field
                table: 'transports',
                field: 'id'
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
        })
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('mains');
    }
};