import type { Page } from '@playwright/test'

export class BasePage {
  constructor(public readonly page: Page) {}

  get #sidebarLists() {
    return this.page.getByRole('navigation').first().getByRole('list')
  }

  get #topicsList() {
    return this.#sidebarLists.first()
  }

  get #topicsListItems() {
    return this.#topicsList.getByRole('listitem')
  }

  async getTopics() {
    const locators = await this.#topicsListItems.all()

    return Promise.all(locators.map((locator) => locator.innerText()))
  }

  async getTopicsLinks() {
    const locators = await this.#topicsListItems.all()

    return Promise.all(locators.map((locator) => locator.getByRole('link').first().getAttribute('href')))
  }

  async getCurrentTopic() {
    const locators = await this.#topicsList.locator('li .starlight-sidebar-topics-current').all()

    if (locators.length !== 1) {
      throw new Error(`Expected 1 current topic, found ${locators.length}.`)
    }

    return locators[0]?.innerText()
  }

  async getSidebarItems() {
    const [, ...sidebarLists] = await this.#sidebarLists.all()
    const sidebarItems = await Promise.all(
      sidebarLists.map((list) => list.getByRole('listitem').locator(':is(div, a) > span').all()),
    )

    return Promise.all(sidebarItems[0]?.map((item) => item.textContent()) ?? [])
  }
}
