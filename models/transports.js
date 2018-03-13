'use strict';
module.exports = (sequelize, DataTypes) => {
    var transports = sequelize.define('transports', {}, {});
    transports.associate = function(models) {
        // associations can be defined here
    };
    return transports;
};