const chromium = require("@sparticuz/chromium")
const puppeteer = require("puppeteer-core")

function delay(time) {
  return new Promise(function (resolve) {
    setTimeout(resolve, time)
  })
}

exports.handler = async (event) => {
  const browser = await puppeteer.launch({
    args: chromium.args,
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath(),
    headless: chromium.headless,
    ignoreHTTPSErrors: true,
  })

  const page = await browser.newPage()
  await page.setViewport({
    width: 1920,
    height: 1080,
  })

  await page.goto("https://caulicloud.com/authentication", {
    waitUntil: "networkidle2",
    timeout: 0,
  })

  await page.waitForSelector("#continueWithEmail")
  await page.click("#continueWithEmail")

  await page.type("#emailInput", "example@email.com")
  await page.click("#continueLoggingIn")

  await page.waitForSelector("#passwordInput", { visible: true })
  await page.type("#passwordInput", "wrong_password")

  await page.waitForSelector("#continueLoggingIn", { visible: true })
  await page.click("#continueLoggingIn")

  await page.waitForSelector("#monitorsList", { visible: true, timeout: 20000 })

  const element = await page.waitForSelector("#monitorsList > li:first-of-type")
  await element.click()

  await delay(5000)

  await browser.close()

  return event
}
