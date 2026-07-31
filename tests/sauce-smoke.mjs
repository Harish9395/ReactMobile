import { remote } from 'webdriverio'

const driver = await remote({
  protocol: 'https:',
  hostname: 'ondemand.eu-central-1.saucelabs.com',
  port: 443,
  path: '/wd/hub',
  user: process.env.SAUCE_USERNAME,
  key: process.env.SAUCE_ACCESS_KEY,
  capabilities: {
    platformName: 'Android',
    'appium:app': process.env.SAUCE_APP,
    'appium:deviceName': process.env.SAUCE_DEVICE ?? 'Android GoogleAPI Emulator',
    'appium:platformVersion': process.env.SAUCE_PLATFORM_VERSION ?? '14',
    'appium:automationName': 'UiAutomator2',
    'sauce:options': {
      build: `daily-focus-${process.env.GITHUB_RUN_NUMBER ?? 'local'}`,
      name: 'Daily Focus smoke test',
    },
  },
})

try {
  const title = await driver.$('android=new UiSelector().textContains("Make today")')
  await title.waitForDisplayed({ timeout: 30000 })
  await driver.saveScreenshot('./daily-focus-sauce.png')
  await driver.execute('sauce:job-result=passed')
} catch (error) {
  await driver.execute('sauce:job-result=failed')
  throw error
} finally {
  await driver.deleteSession()
}
