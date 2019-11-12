const puppeteer = require('puppeteer')

let browserInstance = null
const browser = {
  tearUp: async () => {
    browserInstance = await puppeteer.launch({
      headless: false // extension are allowed only in head-full mode
    })
  },
  tearDown: async () => {
    browserInstance.close()
  }
}

describe('Chrome Extension', () => {
  beforeAll(browser.tearUp)

  afterAll(browser.tearDown)

  test('should load the extension without crash', async () => {})
})
