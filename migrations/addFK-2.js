'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addConstraint('mains', ['place'], {
            type: 'foreign key',
            name: 'custom_fkey_constraint_name',
            references: { //Required field
                table: 'destinations',
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