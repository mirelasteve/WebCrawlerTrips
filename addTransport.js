module.exports = (link) => {
    const jsdom = require('jsdom');
    const {
        JSDOM
    } = jsdom;
    const $init = require('jquery');
    const db = require('./models');
    const {
        mains,
        destinations,
        transport
    } = db;
    const addTransport = async(tr) => {
        await transports.findOrCreate({
            where: {
                name: tr
            }
        })
    }
    const getDatas = async(originLink) => {
        const domOrigin = await JSDOM.fromURL(originLink);
        const $origin = $init(domOrigin.window);
        const originBody = $origin("body").text();
        const price = originBody.match(/Цена от .*/).join(' ').split(' ');
        const transport = originBody.match(/автобус|самолет|круиз/);
        const period = originBody.match(/\d*.? дни|\d*.? нощувки/);
        const place = originBody.match(/Екскурзии.*/).join(' ').split('-');
        console.log(place[1] + "  " + price[2] + "  " + transport[0] + " " + period[0]);
        await addTransport(transport[0]);
        // await addTransport(transport[0]);
        // create(place[1], price[2], transport[0], period[0]);
    };
    return getDatas(link);
}