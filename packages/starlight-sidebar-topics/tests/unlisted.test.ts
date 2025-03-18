import { expect, test } from './test'

const secretPages = [
  '/unlisted/page/',
  '/unlisted/splash/',
  '/unlisted/topics/',
  '/unlisted/custom-page/',
  '/unlisted/custom-splash/',
  '/unlisted/custom-no-sidebar/',
]

for (const secretPage of secretPages) {
  test(`supports unlisted pages: ${secretPage}`, async ({ demoPage }) => {
    await demoPage.goto(secretPage)
    await expect(demoPage.page.getByText('This page exists solely for demonstration purposes')).toBeVisible()
  })
}
