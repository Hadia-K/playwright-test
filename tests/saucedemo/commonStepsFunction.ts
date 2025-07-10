import { Page, expect } from '@playwright/test'
import testLocators from '../../Constants/Locators'

export const gotoAppBaseUrl = async (page: Page) => {
  if (!process.env.BASE_URL) {
    return
  }
  await page.goto('/')

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(testLocators.txtLocators.selectOrganizationHeading)

  const loginPage = page.getByText(testLocators.txtLocators.loginPage)
  await expect(loginPage).toBeVisible

}

export const verifyAndEnterUsername = async (page: Page, username: string) => {
  const usernameInput = page.getByTestId(testLocators.dataTestIdLocators.username)

  await expect(usernameInput).toBeVisible()
  await usernameInput.fill(username)
}

export const verifyAndEnterPassword = async (page: Page, password: string) => {
  const passwordInput = page.getByTestId(testLocators.dataTestIdLocators.password)

  await expect(passwordInput).toBeVisible()
  await passwordInput.fill(password)
}

export const verifyAndClickLoginBtn = async (page: Page) => {
  const loginBtn = page
    .getByRole('button')
    .filter({ hasText: testLocators.txtLocators.logInBtnTxt })

  await expect(loginBtn).toBeVisible()
  await loginBtn.click()
}

export const verifyLoginSuccessfullScreen = async (page: Page) => {
  // Expects page to have a heading with the name of Swag Labs.
  // const homePage = page.getByRole('heading', { name: testLocators.txtLocators.selectOrganizationHeading })
  const homePage = page.getByTestId('title')

  await expect(homePage).toBeVisible()
}

export const verifyInvalidCredsAlert = async (page: Page) => {
  const invalidCredsError = page
    .getByTestId(testLocators.dataTestIdLocators.error)
    .filter({ hasText: testLocators.txtLocators.invalidCreds })

  await expect(invalidCredsError).toBeVisible()
}

export const verifyLockedUserAlert = async (page: Page) => {
  const lockedOutError = page
    .getByTestId(testLocators.dataTestIdLocators.error)
    .filter({ hasText: testLocators.txtLocators.lockedOut })

  await expect(lockedOutError).toBeVisible()
}

export const verifyMissingUsernameAlert = async (page: Page) => {
  const missingUsernameError = page
    .getByTestId(testLocators.dataTestIdLocators.error)
    .filter({ hasText: testLocators.txtLocators.missingUsername })

  await expect(missingUsernameError).toBeVisible()
}

export const verifyMissingPasswordAlert = async (page: Page) => {
  const missingPasswordError = page
    .getByTestId(testLocators.dataTestIdLocators.error)
    .filter({ hasText: testLocators.txtLocators.missingPassword })

  await expect(missingPasswordError).toBeVisible()
}

export const verifyLandingPage = async (page: Page) => {
  // All the products should be verified with loop
  const productCards = page.getByTestId(testLocators.dataTestIdLocators.inventoryItem)
  const count = await productCards.count()

  for (let i = 0; i < count; i++) {
    const product = productCards.nth(i)

    // Verify product's title, description, image, price, AddToCart button
    const title = product.getByTestId(testLocators.dataTestIdLocators.products.title)
    const description = product.getByTestId(testLocators.dataTestIdLocators.products.desc)
    const price = product.getByTestId(testLocators.dataTestIdLocators.products.price)
    const image = product.locator(testLocators.xPathLocators.imgClass)
    const addToCartBtn = product.locator(testLocators.classLocators.products.addToCartBtn)

    await expect(title).toBeVisible()
    await expect(description).toBeVisible()
    await expect(image).toBeVisible()
    await expect(price).toBeVisible()
    await expect(addToCartBtn).toBeVisible()
  }
}

export const verifySortFunctionality = async (page: Page) => {
  const sortDropdown = page.getByTestId(testLocators.dataTestIdLocators.sort)
  const productNames = page.getByTestId(testLocators.dataTestIdLocators.products.title)
  const productPrices = page.getByTestId(testLocators.dataTestIdLocators.products.price)

  // Helper to extract visible text from locators
  const getTextArray = async (locator: ReturnType<Page['locator']>) => {
    return await locator.allTextContents()
  }

  // === 1. A to Z ===
  await sortDropdown.selectOption(testLocators.optionLocators.sort.aToZ)
  const aToZNames = await getTextArray(productNames)
  expect([...aToZNames].sort()).toEqual(aToZNames)

  // === 2. Z to A ===
  await sortDropdown.selectOption(testLocators.optionLocators.sort.zToA)
  const zToANames = await getTextArray(productNames)
  expect([...zToANames].sort().reverse()).toEqual(zToANames)

  // === 3. Price Low to High ===
  await sortDropdown.selectOption(testLocators.optionLocators.sort.lowToHigh)
  const lowToHighPrices = await getTextArray(productPrices)
  const lowToHighNumbers = lowToHighPrices.map(p => parseFloat(p.replace('$', '')))
  expect([...lowToHighNumbers].sort((a, b) => a - b)).toEqual(lowToHighNumbers)

  // === 4. Price High to Low ===
  await sortDropdown.selectOption(testLocators.optionLocators.sort.highToLow)
  const highToLowPrices = await getTextArray(productPrices)
  const highToLowNumbers = highToLowPrices.map(p => parseFloat(p.replace('$', '')))
  expect([...highToLowNumbers].sort((a, b) => b - a)).toEqual(highToLowNumbers)
}


export const verifyCartFunctionality = async (page: Page) => {
  // Add to Cart
  const addToCartBtn = page.locator(testLocators.xPathLocators.addToCart).first()
  await addToCartBtn.click()

  // Check Cart count
  const cartBadgeLocator = page.getByTestId(testLocators.dataTestIdLocators.cartBadge)
  const cartBadgeText = await cartBadgeLocator.textContent()

  const addedCartCount = cartBadgeText ? parseFloat(cartBadgeText) : 0
  await expect(addedCartCount).toBeGreaterThan(0)

  // Remove from Cart
  const removeFromCartBtn = page.locator(testLocators.dataTestIdLocators.removeFromCart).first()
  await removeFromCartBtn.click()

  // Check if cart badge locator exists
  const cartBadgeLocator2 = page.getByTestId(testLocators.dataTestIdLocators.cartBadge)
  await expect(cartBadgeLocator2).toHaveCount(0)

}

export const verifyCartFunctionality2 = async (page: Page) => {

  async function verifyItemInCart(page: Page, expected = true) {
    const item = page.locator(testLocators.dataTestIdLocators.cartItem.inCartItem, { hasText: testLocators.txtLocators.cartItemName })
    if (expected) {
      await expect(item).toBeVisible()
    } else {
      await expect(item).toHaveCount(0)
    }
  }

  // Add to Cart
  // await page.click(testLocators.dataTestIdLocators.cartItem.addToCart)
  await page
    .locator(testLocators.classLocators.products.price)
    .filter({ has: page.getByRole('button', { name: 'add-to-cart-sauce-labs-backpack' }) })
    .isVisible()

  // // Go To Cart
  // await page.click(testLocators.dataTestIdLocators.cartLink)

  // // Check item is in cart
  // await verifyItemInCart(page, true)

  // // Remove from Cart
  // await page.click(testLocators.dataTestIdLocators.cartItem.removeFromCart)

  // // Check item is removed
  // await verifyItemInCart(page, false)
}

export const verifyCheckout = async (page: Page,  firstName: string, lastName: string, zip: string) => {
  // Add to Cart
  const addToCartBtn = page.getByRole('button').filter({ hasText: testLocators.txtLocators.addToCart }).first()
  await addToCartBtn.click()

  // Go To Cart
  await page.goto('/cart.html')

  // Click Checkout
  const checkoutBtn = page.getByRole('button').filter({ hasText: testLocators.txtLocators.checkout })
  await checkoutBtn.click()

  // Fill Form
  const firstNameInput = page.getByTestId(testLocators.dataTestIdLocators.checkoutInfo.firstName)
  await firstNameInput.fill(firstName)
  const lastNameInput = page.getByTestId(testLocators.dataTestIdLocators.checkoutInfo.lastName)
  await lastNameInput.fill(lastName)
  const zipInput = page.getByTestId(testLocators.dataTestIdLocators.checkoutInfo.zip)
  await zipInput.fill(zip)

  const continueBtn = page.getByRole('button').filter({ hasText: testLocators.txtLocators.continue })
  await continueBtn.click()

  const finishBtn = page.getByRole('button').filter({ hasText: testLocators.txtLocators.finish })
  await finishBtn.click()
  
  const checkoutComplete = page
    .getByTestId(testLocators.dataTestIdLocators.checkoutComplete)
    .getByText(testLocators.txtLocators.checkoutComplete)
  await expect(checkoutComplete).toBeVisible()
}