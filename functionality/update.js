const db = require('../models');
const {
    mains,
    destinations
} = db;
const update = async() => {
    destinations.destroy({
        where: {
            // criteria
        },
        force: true,

    });
    mains.destroy({
        where: {
            // criteria
        },
        force: true,
        restartIdentity: true
    })
}
update();