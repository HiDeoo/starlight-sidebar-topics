import { expect, test } from './test'

test('uses topic sidebars', async ({ demoPage, docPage }) => {
  await docPage.goto('/getting-started/')

  expect(await docPage.getSidebarItems()).toEqual([
    'Start Here',
    'Getting Started',
    'Configuration',
    'Resources',
    'Starlight Plugins and Tools',
  ])

  await demoPage.goto()

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

  expect(await docPage.getSidebarItems()).toEqual(expectedDemoSidebarItems)

  await demoPage.goto('/api/adddescription/')

  expect(await docPage.getSidebarItems()).toEqual(expectedDemoSidebarItems)
})
