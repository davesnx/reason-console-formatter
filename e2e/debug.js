const puppeteer = require('puppeteer')
const path = require('path')

;(async () => {
  const extensionPath = path.join(__dirname, '..', 'extension')
  let browser
  try {
    browser = await puppeteer.launch({
      dumpio: true,
      headless: false,
      args: [
        // `--disable-extensions-except=${extensionPath}`,
        // `--load-extension=${extensionPath}`,
        '--no-sandbox',
        '--disable-setuid-sandbox',
        '--disable-dev-shm-usage'
      ]
    })
  } catch (e) {
    console.log(e)
  }

  console.log('browser starting')
  const page = await browser.newPage()
  console.log('browser started')
  await page.goto('https://example.com/', { waitUntil: 'domcontentloaded' })
  console.log('page connected')
  await page.waitFor(5000)
  const title = await page.title()
  console.log('title is', title)
  await browser.close()
})()
