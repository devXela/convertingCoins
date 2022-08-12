const puppeteer = require('puppeteer');
const path = require("path");

exports.convert_coin = function(req, res) {
    console.log(req.body)
    let pathConvertPrints = path.resolve(__dirname, '../../client/public/printsOfConversions');
    let coin = req.body.coin;
    let valueToConvert = req.body.valueToConvert;

    (async () => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        await page.setViewport({ width: 1280, height: 800 });
        await page.goto('http://google.com');
        let toConvert = valueToConvert + ' BRL para ' + coin;
        await page.type('input[name=q]', toConvert, { delay:100 });
        await page.mouse.click(0, 10, { button: 'left' })
        await page.$eval("input[type='submit']", elem => elem.click());
        await page.waitForSelector('#knowledge-currency__updatable-data-column');
        let valueConverted = await page.$eval('span[data-precision="2"]', el => el.innerText);  
        let screenshot = '/converted' + Math.round(+new Date()/1000) + '.png';
        await page.screenshot({path: pathConvertPrints + screenshot, fullPage: true});
        await browser.close();

        res.send({
            status: 200,
            valueConverted: valueConverted,
            screenshot: screenshot
        });
    })();
}