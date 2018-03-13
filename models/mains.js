'use strict';
module.exports = (sequelize, DataTypes) => {
    var mains = sequelize.define('mains', {
        place: DataTypes.INTEGER,
        price: DataTypes.INTEGER,
        transport: DataTypes.INTEGER,
        period: DataTypes.STRING,
    }, {});
    mains.associate = function(models) {

    };
    return mains;
};