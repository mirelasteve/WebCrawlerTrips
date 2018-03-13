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
const visited = new Set();
var results;
const addDestination = require('./addDestination.js');
const create = require('./createMains.js');

const findDatas = async(link) => {
    const domm = await JSDOM.fromURL(link);
    const $m = await $init(domm.window);
    var body = await $m("body");
    if (link.includes('nasam')) {
        results = await $m('#search_results a.text_box_8');
    }
    if (link.includes('loyal')) {
        results = await $m("div .content .row a[itemprop=url]");

    }
    let asyncQue = Object.values(results);
    first = asyncQue.slice(0, 1).filter((h) => h !== 'undefined');
    first.map((p) => {
        try {
            addDestination(p.href);
        } catch (err) {}
    });


};

const run = async(url) => {
    const dom = await JSDOM.fromURL(url);
    const $ = await $init(dom.window);
    var body = await $("body");
    var arr = await body.html();
    var allHrefs = arr.match(/href=.+?\>/gim);
    var correctHrefs = new Set();
    allHrefs.map((x) => {
        x = decodeURI(x);
        // console.log(x);
        if (x.includes('ekskurzii/') || x.includes('bohemia')) {
            // console.log(x);
            let add;
            let ind;
            let link;
            if (x.includes('loyal-travel') && x.includes('title')) {
                // console.log(x);
                add = x.slice(6, );
                ind = add.indexOf(' ');
                add = add.slice(0, ind - 1);
                link = add;
                correctHrefs.add(link);
            }
            if (!x.includes('loya')) {
                add = x.slice(6, );
                ind = add.indexOf('"', 7);
                add = add.slice(0, ind);
                // console.log(url);
                link = (url + add);
                // console.log(link);
                correctHrefs.add(link);
            }
            if (x.includes('bohemia') && (x.includes('Екскурзи') || x.includes('Направлен'))) {
                add = x.slice(6, );
                ind = add.lastIndexOf('>');
                add = add.slice(0, ind - 2);
                link = add;
                correctHrefs.add(link);
            }
        }
    });
    const visitedLinks = new Set();
    [...correctHrefs].map((href) => {
        // console.log(href);
        // console.log([...correctHrefs].length);
        findDatas(href);
    });
}
var urls = 'http://www.loyal-travel.com/ekskurzii/,http://www.nasamnatam.com/'.split(',');
urls.map((url) => {
    run(url);
});
// 'http://www.loyal-travel.com/ekskurzii/,http://www.nasamnatam.com/
// addDestination('http://www.loyal-travel.com/ekskurzii/bosna-i-hertcegovina-76');,http://www.nasamnatam.com/

// http://www.nasamnatam.com/
// addDestination('http://www.nasamnatam.com/ekskurzia/Ekskurziia_Izrael_5_dni_Ekspres_Ha-168780.html');
// http://www.loyal-travel.com/ekskurzii/http://www.nasamnatam.com/
// addDestination('https://www.bohemia.bg/p/%D0%98%D0%B7%D1%80%D0%B0%D0%B5%D0%BB-%D1%82%D0%B0%D0%B9%D0%BD%D0%B8%D1%82%D0%B5-%D0%BD%D0%B0-%D1%81%D0%B2%D0%B5%D1%89%D0%B5%D0%BD%D0%B0%D1%82%D0%B0-%D0%B7%D0%B5%D0%BC%D1%8F-%D0%B5%D0%BA%D1%81%D0%BA%D1%83%D1%80%D0%B7%D0%BE%D0%B2%D0%BE%D0%B4/6000001426/');np