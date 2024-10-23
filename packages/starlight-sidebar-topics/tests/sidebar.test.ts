import { expect, test } from './test'

const expectedDemoSidebarItems = [
  'API',
  'addDescription',
  'build',
  'Deprecated',
  'debugProject',
  'onCancellation',
  'rewrite',
  'Components',
  '<Demo />',
  'New',
  '<Hello />',
  '<World />',
  'Commands',
  'demo build',
  'demo create',
  'demo preview',
]

test('uses topic sidebars', async ({ demoPage, docPage }) => {
  await docPage.goto('/getting-started/')

  expect(await docPage.getSidebarItems()).toEqual([
    'Start Here',
    'Getting Started',
    'Configuration',
    'Guides',
    'Unlisted Pages',
    'Resources',
    'Starlight Plugins and Tools',
  ])

  await demoPage.goto()

  expect(await docPage.getSidebarItems()).toEqual(expectedDemoSidebarItems)

  await demoPage.goto('/api/adddescription/')

  expect(await docPage.getSidebarItems()).toEqual(expectedDemoSidebarItems)
})

test('supports unlisted pages', async ({ demoPage, docPage }) => {
  await demoPage.goto('/secret/')

  expect(await docPage.getSidebarItems()).toEqual(expectedDemoSidebarItems)
})
