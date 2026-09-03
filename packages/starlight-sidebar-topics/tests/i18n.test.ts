import { expect, test } from './test'

test('uses translations for topics labels and badges', async ({ docPage }) => {
  await docPage.goto('/getting-started/', 'fr')

  expect(await docPage.getTopics()).toEqual(['Documentation', 'Démo Ébauche', 'Starlight Docs'])
})

test('supports localized topic root pages', async ({ demoPage }) => {
  await demoPage.page.goto('/fr/demo/')

  expect(await demoPage.getCurrentTopic()).toBe('Démo Ébauche')
})
