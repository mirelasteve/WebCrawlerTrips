'use strict';
module.exports = (sequelize, DataTypes) => {
    var destination = sequelize.define('destinations', {
        name: DataTypes.STRING
    }, {});
    destination.associate = function(models) {
        // associations can be defined here

    };
    return destination;
};