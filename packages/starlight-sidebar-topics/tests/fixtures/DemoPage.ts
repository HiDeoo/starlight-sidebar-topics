import type { Page } from '@playwright/test'

import { BasePage } from './BasePage'

export class DemoPage extends BasePage {
  constructor(public override readonly page: Page) {
    super(page)
  }

  goto(pathname?: string) {
    return this.page.goto(`/demo${pathname ?? ''}`)
  }
}
