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
    'Excluded Pages',
    'Custom Topic List',
    'Resources',
    'Plugins and Tools',
  ])

  await demoPage.goto()

  expect(await docPage.getSidebarItems()).toEqual(expectedDemoSidebarItems)

  await demoPage.goto('/api/adddescription/')

  expect(await docPage.getSidebarItems()).toEqual(expectedDemoSidebarItems)
})

test('supports unlisted pages', async ({ demoPage, docPage }) => {
  await demoPage.goto('/unlisted/page/')

  expect(await docPage.getSidebarItems()).toEqual(expectedDemoSidebarItems)
})

test('supports excluded custom pages with a custom sidebar', async ({ demoPage, docPage }) => {
  await demoPage.goto('/excluded/custom-page/')

  expect(await docPage.getSidebarItems(true)).toEqual([
    'Home',
    'Start Here',
    'Getting Started',
    'Configuration',
    'Demo',
  ])
})
