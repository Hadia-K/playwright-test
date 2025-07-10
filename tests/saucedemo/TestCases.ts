import { Page } from '@playwright/test'
import { gotoAppBaseUrl, verifyAndClickLoginBtn, verifyAndEnterPassword, verifyAndEnterUsername } from './commonStepsFunction'

export const enterUsernameAndPassword = async (
  page: Page,
  username: string,
  password: string,
) => {
  await gotoAppBaseUrl(page)

  await verifyAndEnterUsername(page, username)

  await verifyAndEnterPassword(page, password)

  await verifyAndClickLoginBtn(page)
}
