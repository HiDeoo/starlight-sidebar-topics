import { defineConfig, devices } from '@playwright/test'

const isCI = !!process.env['CI']

export default defineConfig({
  forbidOnly: isCI,
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Re-use system Chrome on CI to avoid re-installing it on every run.
        channel: isCI ? 'chrome' : undefined,
        headless: true,
      },
    },
  ],
  use: {
    baseURL: 'http://localhost:4321',
  },
  webServer: [
    {
      command: 'pnpm run build --mode test && pnpm run preview',
      cwd: '../../docs',
      env: { NODE_ENV: 'test' },
      reuseExistingServer: !isCI,
      url: 'http://localhost:4321',
    },
  ],
})
