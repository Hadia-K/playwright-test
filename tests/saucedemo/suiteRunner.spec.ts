import { test, Page } from '@playwright/test'
import { enterUsernameAndPassword } from './TestCases'
import {
  verifyCartFunctionality,
  verifyCartFunctionality2,
  verifyCheckout,
  verifyInvalidCredsAlert, verifyLandingPage, verifyLockedUserAlert,
  verifyLoginSuccessfullScreen, verifyMissingPasswordAlert, verifyMissingUsernameAlert,
  verifySortFunctionality
} from './commonStepsFunction'


test('sauceDemo', async ({ page }) => {
  await page.goto('/')
  await page.locator('[data-test="username"]').click()
  await page.locator('[data-test="username"]').fill('standard_user')
  await page.locator('[data-test="password"]').click()
  await page.locator('[data-test="password"]').fill('secret_sauce')
  await page.locator('[data-test="login-button"]').click()
  await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click()
  await page.locator('[data-test="product-sort-container"]').selectOption('lohi')
  await page.locator('[data-test="add-to-cart-sauce-labs-bolt-t-shirt"]').click()
  await page.locator('[data-test="shopping-cart-link"]').click()
  await page.locator('[data-test="item-4-title-link"]').click()
  await page.locator('[data-test="back-to-products"]').click()
  await page.locator('[data-test="shopping-cart-link"]').click()
  await page.locator('[data-test="checkout"]').click()
  await page.locator('.checkout_info').click()
  await page.locator('[data-test="firstName"]').click()
  await page.locator('[data-test="firstName"]').fill('user')
  await page.locator('[data-test="firstName"]').press('Tab')
  await page.locator('[data-test="lastName"]').fill('two')
  await page.locator('[data-test="lastName"]').press('Tab')
  await page.locator('[data-test="postalCode"]').fill('1234')
  await page.locator('[data-test="continue"]').click()
  await page.locator('[data-test="finish"]').click()
  await page.locator('[data-test="back-to-products"]').click()

  await page.screenshot({ path: `shopping_flow.png` })
})


test.describe(`Page - Login`, () => {
  let page: Page
  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage()
  })

  test.afterEach(async () => {
    await page.close()
    // await cleanupChromeDriver()
    // await killChromeTab()
  })

  test('Test: 1 :- User is able to login into the website with correct credential username and password', async () => {
    const username = process.env.SAUCE_USERNAME || ''
    const password = process.env.PASSWORD || ''

    await test.step('Entering correct credential', async () => {
      await enterUsernameAndPassword(page, username, password)
    })

    await test.step('Verify login successfull screen', async () => {
      await verifyLoginSuccessfullScreen(page)
    })
  })

  test('Test: 2 :- User should not be able to login without entering username', async () => {
    const username = ''
    const password = process.env.PASSWORD || ''

    await test.step('Missing username', async () => {
      await enterUsernameAndPassword(page, username, password)
    })
    await test.step('Verify missing username alert', async () => {
      await verifyMissingUsernameAlert(page)
    })
  })

  test('Test: 3 :- User should not be able to login without entering password', async () => {
    const username = process.env.SAUCE_USERNAME || ''
    const password = ''

    await test.step('Missing password', async () => {
      await enterUsernameAndPassword(page, username, password)
    })
    await test.step('Verify missing password alert', async () => {
      await verifyMissingPasswordAlert(page)
    })
  })

  test('Test: 4 :- User should be locked out for a certain username but with a correct password', async () => {
    const username = process.env.LOCKED_OUT_USERNAME || ''
    const password = process.env.PASSWORD || ''

    await test.step('Entering locked out username', async () => {
      await enterUsernameAndPassword(page, username, password)
    })

    await test.step('Verify locked out user alert', async () => {
      await verifyLockedUserAlert(page)
    })
  })

  test('Test: 5 :- User should not be able to login with incorrect username and password', async () => {
    const username = process.env.INCORRECT_USERNAME || ''
    const password = 'Test#1234'

    await test.step('Entering incorrect credential', async () => {
      await enterUsernameAndPassword(page, username, password)
    })

    await test.step('Verify invalid credential alert', async () => {
      await verifyInvalidCredsAlert(page)
    })
  })

  test(`Test: 6 :- Verify the landing page: all the products (title, description, image, price, AddToCart button) should be verified with loop`, async () => {
    const username = process.env.SAUCE_USERNAME || ''
    const password = process.env.PASSWORD || ''

    await test.step('Entering correct credential', async () => {
      await enterUsernameAndPassword(page, username, password)
    })

    await test.step('Verify login successfull screen', async () => {
      await verifyLoginSuccessfullScreen(page)
    })

    await test.step('Verify landing page', async () => {
      await verifyLandingPage(page)
    })
  })

  test(`Test: 7 :- Verify the sort functionality by implementing all the options`, async () => {
    const username = process.env.SAUCE_USERNAME || ''
    const password = process.env.PASSWORD || ''

    await test.step('Entering correct credential', async () => {
      await enterUsernameAndPassword(page, username, password)
    })

    await test.step('Verify Sort Functionality', async () => {
      await verifySortFunctionality(page)
    })
  })

  test(`Test: 8 :- Add and remove item from cart`, async () => {
    const username = process.env.SAUCE_USERNAME || ''
    const password = process.env.PASSWORD || ''

    await test.step('Entering correct credential', async () => {
      await enterUsernameAndPassword(page, username, password)
    })

    await test.step('Verify Cart Functionality', async () => {
      await verifyCartFunctionality(page)
      // await verifyCartFunctionality2(page)
    })
  })

  test(`Test: 9 :- Complete the Checkout Process`, async () => {
    const username = process.env.SAUCE_USERNAME || ''
    const password = process.env.PASSWORD || ''
    const firstName = process.env.CHECKOUT_FIRST_NAME || ''
    const lastName = process.env.CHECKOUT_LAST_NAME || ''
    const zip = process.env.ZIP || ''

    await test.step('Entering correct credential', async () => {
      await enterUsernameAndPassword(page, username, password)
    })

    await test.step('Verify Checkout', async () => {
      await verifyCheckout(page, firstName, lastName, zip)
    })
  })
})