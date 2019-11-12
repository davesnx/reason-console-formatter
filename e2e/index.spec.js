const puppeteer = require('puppeteer')
const path = require('path')

const extensionPath = path.join(__dirname, '..', 'extension')
const fixtures = path.join(__dirname, '__fixtures__')

let browser = null
const tearUp = async () => {
  browser = await puppeteer.launch({
    devtools: true,
    slowMo: 500,
    // chromeOptions: {
    //   prefs: {
    //     'devtools.preferences.customFormatters': true // Currently not possible
    //   }
    // },
    headless: false, // extension are allowed only in head-full mode
    args: [
      `--disable-extensions-except=${extensionPath}`,
      `--load-extension=${extensionPath}`
    ]
  })

  const wsEndpoint = browser.wsEndpoint()

  // the page I want to debug
  const myPage = await browser.newPage()
  const pageId = myPage.target()._targetId

  // use the host:port that Chromium provided, but replace the browser endpoint with the page to inspect
  const pageTargeUrl = `${
    wsEndpoint.replace('ws://', '').match(/.*(?=\/browser)/)[0]
  }/page/${pageId}`

  // generate the full debugging url for the page I want to inspect
  const pageDebuggingUrl = `chrome-devtools://devtools/bundled/devtools_app.html?ws=${pageTargeUrl}`

  // open the debugging UI in a new tab that Puppeteer can interact with
  const devtoolsPage = await browser.newPage()
  await devtoolsPage.goto(pageDebuggingUrl)

  // navigate to the page now so that we start capturing data in the debugger UI
  await myPage.goto('http://example.com')

  // the installed extension may open a new tab so make sure we select the debugger UI tab
  await devtoolsPage.bringToFront()

  // use F1 shortut to open DevTools Preferences
  await devtoolsPage.keyboard.down('F1')

  await devtoolsPage.evaluate(() => {
    return document
      .querySelector('#-blink-dev-tools > div.vbox.flex-auto')
      .shadowRoot.querySelector('div > div.vbox.flex-auto')
      .shadowRoot.querySelector(
        '#preferences-tab-content > div > div > div:nth-child(7) > p:nth-child(11) > span'
      )
      .shadowRoot.querySelector('[name="Enable custom formatters"]')
      .click()
  })
}

const tearDown = async () => {
  browser.close()
}

jest.setTimeout(300000)

describe('Chrome Extension', () => {
  beforeAll(tearUp)

  afterAll(tearDown)

  test('should load the extension and install formatters', async () => {
    const page = await browser.newPage()
    await page.goto('https://example.com')
    const devtoolsFormatters = await page.evaluate(
      () => window.devtoolsFormatters
    )
    const formattersLoaded = await page.evaluate(() => window.formattersLoaded)

    expect(devtoolsFormatters).toHaveLength(1)
    expect(formattersLoaded).toBeTruthy()
  })

  test('should pretty print Lists', async () => {
    const page = await browser.newPage()
    await page.goto('https://example.com')

    page.on('console', async msg => {
      const output = await msg.args()[0]
      console.log(output._remoteObject.preview.properties)
    })

    await page.addScriptTag({
      content: `
        console.log(
          /* :: */ [
            1,
            /* :: */ [2, /* :: */ [3, /* :: */ [4, /* :: */ [5, /* [] */ 0]]]]
          ]
        )
      `
    })
    // const devtoolsFormatters = await page.evaluate(
    //   () => window.devtoolsFormatters
    // )
    // expect(devtoolsFormatters).toHaveLength(1)
  })
})
