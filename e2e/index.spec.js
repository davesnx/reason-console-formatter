const puppeteer = require('puppeteer')
const path = require('path')

const extensionPath = path.join(__dirname, '..', 'extension')

let browser = null
const tearUp = async () => {
  try {
    browser = await puppeteer.launch({
      devtools: false,
      dumpio: true,
      chromeOptions: {
        // localState: { 'devtools.preferences.customFormatters': true } // Currently not possible
        //   prefs: {
        //     'devtools.preferences.customFormatters': true // Currently not possible
        //   }
      },
      headless: false, // extension are allowed only in head-full mode
      args: [
        `--disable-extensions-except=${extensionPath}`,
        `--load-extension=${extensionPath}`,
        '--no-sandbox',
        '--disable-setuid-sandbox'
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
    await myPage.goto('https://example.com')

    // the installed extension may open a new tab so make sure we select the debugger UI tab
    await devtoolsPage.bringToFront()

    // use F1 shortut to open DevTools Preferences
    await devtoolsPage.keyboard.down('F1')

    // makes the library available in evaluate functions which run within the browser context
    await devtoolsPage.addScriptTag({
      path: path.join(
        __dirname,
        '..',
        'node_modules/query-selector-shadow-dom/dist/querySelectorShadowDom.js'
      )
    })

    await devtoolsPage.evaluateHandle(() => {
      var cutomFormatterInput = querySelectorShadowDom // eslint-disable-line
        .querySelectorAllDeep(
          '#-blink-dev-tools [name="Enable custom formatters"]'
        )

      return cutomFormatterInput[0].click()
    })
  } catch (e) {
    console.error(e)
  }
}

const tearDown = async () => {
  browser.close()
}

jest.setTimeout(300000)

describe('Chrome Extension', () => {
  beforeAll(tearUp)

  afterAll(tearDown)

  test('should load the extension and install formatters', async () => {
    const page = (await browser.pages())[0]
    await page.goto('https://example.com')
    const devtoolsFormatters = await page.evaluate(
      () => window.devtoolsFormatters
    )
    const formattersLoaded = await page.evaluate(() => window.formattersLoaded)

    expect(devtoolsFormatters).toHaveLength(1)
    expect(formattersLoaded).toBeTruthy()

    // TODO: await page.close()
  })

  // https://stackoverflow.com/questions/58827692/how-to-evaluate-a-jshandle-from-consolemessages-in-puppetter
  test.skip('should pretty print Lists', async done => {
    const page = (await browser.pages())[0]

    page.on('console', async msg => {
      try {
        const output = await msg.args()[0]
        const resultHandle = await page.evaluate(out => out, output)
        expect(resultHandle).toEqual([1, 2, 3, 4, 5])
        done()
      } catch (e) {
        console.log(e)
      }
    })

    await page.goto('https://example.com')
    await page.addScriptTag({
      content: `
        console.log([1, [2, [3, [4, [5, 0]]]]]);
        debugger;
      `
    })
    await page.waitFor(4000)
  })
})
