import { defineConfig } from 'tsdown'

export default defineConfig({
  copy: [{ from: 'src/**/*.astro', flatten: false }],
  deps: {
    neverBundle: [/^astro:/, /^virtual:starlight-sidebar-topics\//],
  },
  dts: true,
  entry: ['src/**/*.ts'],
  fixedExtension: false,
  publint: { strict: true },
  unbundle: true,
})
