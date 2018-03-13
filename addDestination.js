// getDatas(link)
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
        transports
    } = db;
    const create = require('./createMains.js');
    const addDestination = async(place) => {
        await destinations.findOrCreate({
            where: {
                name: place
            }
        })
    }
    var arr = [];
    const getDatas = async(originLink) => {
        arr.push(originLink);
        console.log(originLink);
        const domOrigin = await JSDOM.fromURL(originLink);
        const $origin = await $init(domOrigin.window);
        const originBody = await $origin("body").text();
        const transport = originBody.match(/автобус|самолет|круиз/g);
        const price = originBody.match(/Цен.*?лв|Цена от.*?\d+/gim).join(' ').split(' ');
        let place = '';
        let period = '';
        if (originLink.includes('loyal')) {
            place = $origin("div .breadcrumb span:last-child").text().trim();
            period = originBody.match(/\d*.?дни.*?\d+|\d*.?нощувки.*?\d+/);
            await addDestination(place);
            await create(place, price[2], transport[0], period[0])
        } else {
            place = originBody.match(/Екскурзии.*/).join(' ').split('-');
            period = originBody.match(/\d*.? дни|\d*.? нощувки/);
            await addDestination(place[1]);
            // await addDestination(place[1]);
            await create(place[1], price[2], transport[0], period[0])
        }

    };
    return getDatas(link);
}