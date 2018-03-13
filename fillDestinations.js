// var request = require('request');
// var datas = request('http://www.loyal-travel.com/');

/*eslint-disable*/
// console.log(datas);
const jsdom = require('jsdom');
const { JSDOM } = jsdom;
const $init = require('jquery');
const db = require('./models');
const {
    mains,
} = db;
console.log(mains);
var asyncQueue = [];
// var url = 'https://www.bohemia.bg/'; /*  http://www.nasamnatam.com/ http://www.doris-bg.com/  https://www.bohemia.bg/  http://www.loyal-travel.com/pochivki/ */
const run = async(url) => {

    const dom = await JSDOM.fromURL(url);
    const $ = $init(dom.window);
    var body = $("body");
    var arr = body.html();
    var allHrefs = arr.match(/href=.+?\>/gim);

    allHrefs.forEach((x) => {
        x = decodeURI(x);

        if (x.includes('ekskurzii') && x.includes('http')) {

            let link = x.match(/http.*?(?=\")/);

            const findDatas = async(link) => {
                // console.log(link);
                const domm = await JSDOM.fromURL(link);
                const $m = $init(domm.window);
                var body = $m("body");
                var i = 1;
                Object.values($m("div .content .row")).forEach((row) => {
                    i += 1;
                    // console.log(link);
                    const transportA = (row.innerHTML).match(/Транспорт.+?(?=")/gim).join(' ').split(' ');
                    const transport = transportA[2];
                    const placeA = (row.textContent).match(/Населено място:.*/g);
                    const place = placeA.join(' ').split(',')[1];
                    const priceA = (row.textContent).match(/цени.*/g).join(' ').match(/ [0-9]* /g);
                    const price = priceA[0];
                    console.log(transport + ' ' + place + ' ' + price);
                    if (transport && price && place) {
                        const create = async(place, price, transport) => {
                                await mains.create({
                                    place: place,
                                    price: price,
                                    transport: transport
                                });
                            }
                            // create(place, price, transport);
                    }
                })
            }

            findDatas(link[0]);

        }



    });
}

var urls = ` http://www.loyal-travel.com/ekskurzii/`.split("\n");
urls.forEach((url) => {
        run(url);
    })
    // console.log(asyncQueue);

//http://www.nasamnatam.com/
// http: //www.doris-bg.com/
//     https: //www.bohemia.bg/
//     http: //www.loyal-travel.com/pochivki/
//  https://www.bohemia.bg/
//  http://www.loyal-travel.com/pochivki/`