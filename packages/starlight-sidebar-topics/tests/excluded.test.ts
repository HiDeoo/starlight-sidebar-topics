import { expect, test } from './test'

const secretPages = [
  '/excluded/page/',
  '/excluded/splash/',
  '/excluded/custom-page/',
  '/excluded/custom-splash/',
  '/excluded/custom-no-sidebar/',
]

for (const secretPage of secretPages) {
  test(`supports excluded pages: ${secretPage}`, async ({ demoPage }) => {
    await demoPage.goto(secretPage)
    await expect(demoPage.page.getByText('This page exists solely for demonstration purposes')).toBeVisible()
  })
}
