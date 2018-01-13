const puppeteer = require('puppeteer');
const { mn, searchName } = require('./config/default');
const srcToImg = require('./helper/srcToImg');

(async _ => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.goto('http://image.baidu.com/')
    console.log('go to http://image.baidu.com/')
    await page.setViewport({
        width: 1920,
        height: 1080
    })
    console.log('reset viewport')
    await page.focus('#kw')
    await page.keyboard.sendCharacter(searchName)
    await page.click('.s_search')
    console.log('go to search list')
    page.on('load', async _ => {
        console.log('page loading done, start fetch ...')
        const srcs = await page.evaluate(_ => {
            const images = document.querySelectorAll('img.main_img')
            return Array.prototype.map.call(images, img => img.src)
        })
        console.log(`get ${srcs.length} images, start download`)
        srcs.forEach(async src => {
            // sleep 反 反爬虫
            await page.waitFor(200)
            await srcToImg(src, mn)
        })
        await browser.close()
    })
})()