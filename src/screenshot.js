const puppeteer = require('puppeteer');
const { screenshot, screenUrl } = require('./config/default');

(async () => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto(screenUrl)
    await page.screenshot({
        path: `${screenshot}/${Date.now()}.png`
    })
    await browser.close()
})()
