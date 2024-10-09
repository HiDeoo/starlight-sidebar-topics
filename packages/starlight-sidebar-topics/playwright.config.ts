import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  forbidOnly: !!process.env['CI'],
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], headless: true },
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
      reuseExistingServer: !process.env['CI'],
      url: 'http://localhost:4321',
    },
  ],
})
