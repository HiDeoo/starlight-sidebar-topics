import { expect, test } from './test'

test('lists topics', async ({ docPage }) => {
  await docPage.goto('/getting-started/')

  expect(await docPage.getTopics()).toEqual(['Documentation', 'Demo Stub', 'Starlight Docs'])
})

test('highlights the current topic', async ({ demoPage, docPage }) => {
  await docPage.goto('/getting-started/')

  expect(await docPage.getCurrentTopic()).toBe('Documentation')

  await demoPage.goto('/api/adddescription/')

  expect(await demoPage.getCurrentTopic()).toBe('Demo Stub')
})

test('highlights the current topic for a topic root page', async ({ demoPage }) => {
  await demoPage.goto()

  expect(await demoPage.getCurrentTopic()).toBe('Demo Stub')
})

test('links to topics', async ({ demoPage }) => {
  await demoPage.goto()

  expect(await demoPage.getTopicsLinks()).toEqual([
    '/docs/getting-started/',
    '/demo/',
    'https://starlight.astro.build/',
  ])
})
