import { expect, test } from './test'

test('uses translations for topics labels and badges', async ({ docPage }) => {
  await docPage.goto('/getting-started/', 'fr')

  expect(await docPage.getTopics()).toEqual(['Documentation', 'Démo Ébauche', 'Starlight Docs'])
})
