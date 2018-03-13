// getDatas(link)
module.exports = (destinat, price, transport, period) => {
    const jsdom = require('jsdom');
    const {
        JSDOM
    } = jsdom;
    const $init = require('jquery');
    const db = require('./models');
    const {
        mains,
        destinations,
        transports
    } = db;

    const check = async(destinat, price, transport, period) => {
        //   const que = `select id from destinations where name='${cap}'`;
        const result = await destinations.findAll({
            where: {
                name: destinat
            }
        });
        const res = await transports.findAll({
            where: {
                transportName: transport
            }
        });
        console.log(result[0].dataValues.id);
        if (result[0].dataValues.id) {
            const create = async(destinat, price, transport, period) => {

                await mains.create({
                    place: result[0].dataValues.id,
                    price: price,
                    transport: res[0].dataValues.id,
                    period: period
                });
            }
            create(destinat, price, transport, period)
        }
    };
    return check(destinat, price, transport, period)
}