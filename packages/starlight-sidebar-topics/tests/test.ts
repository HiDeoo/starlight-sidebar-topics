import { test as base } from '@playwright/test'

import { DemoPage } from './fixtures/DemoPage'
import { DocPage } from './fixtures/DocPage'

export { expect } from '@playwright/test'

export const test = base.extend<Fixtures>({
  demoPage: async ({ page }, use) => {
    const docPage = new DemoPage(page)

    await use(docPage)
  },
  docPage: async ({ page }, use) => {
    const docPage = new DocPage(page)

    await use(docPage)
  },
})

interface Fixtures {
  demoPage: DemoPage
  docPage: DocPage
}
