import type { Page } from '@playwright/test'

import { BasePage } from './BasePage'

export class DocPage extends BasePage {
  constructor(public override readonly page: Page) {
    super(page)
  }

  goto(pathname: string, locale?: string) {
    return this.page.goto(`${locale ? `/${locale}` : ''}/docs${pathname}`)
  }
}
