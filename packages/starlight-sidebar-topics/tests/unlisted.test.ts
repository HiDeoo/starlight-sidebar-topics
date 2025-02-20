import { expect, test } from './test'

const secretPages = [
  '/secrets/page/',
  '/secrets/splash/',
  '/secrets/custom-page/',
  '/secrets/custom-splash/',
  '/secrets/custom-no-sidebar/',
]

for (const secretPage of secretPages) {
  test(`supports unlisted pages: ${secretPage}`, async ({ demoPage }) => {
    await demoPage.goto(secretPage)
    await expect(demoPage.page.getByText('This page exists solely for demonstration purposes')).toBeVisible()
  })
}
