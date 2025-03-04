# starlight-sidebar-topics

## 0.5.0

### Minor Changes

- [#22](https://github.com/HiDeoo/starlight-sidebar-topics/pull/22) [`0e5806f`](https://github.com/HiDeoo/starlight-sidebar-topics/commit/0e5806fa351ff98ea927fe3c5b245dd28852a3a0) Thanks [@HiDeoo](https://github.com/HiDeoo)! - Adds a new [`exclude`](https://starlight-sidebar-topics.netlify.app/docs/configuration#exclude) plugin configuration option to exclude pages from any topic.

  This options can be useful for custom pages that use a custom site navigation sidebar which do not belong to any topic. Excluded pages will use the built-in Starlight sidebar and not render a list of topics.

  See the [“Excluded Pages”](https://starlight-sidebar-topics.netlify.app/docs/guides/excluded-pages) guide to learn more about how to exclude content pages from any topic.

## 0.4.1

### Patch Changes

- [#19](https://github.com/HiDeoo/starlight-sidebar-topics/pull/19) [`3d32f9d`](https://github.com/HiDeoo/starlight-sidebar-topics/commit/3d32f9de841968adc6fcaeefa468db2d01dd975e) Thanks [@HiDeoo](https://github.com/HiDeoo)! - Fixes an issue with unlisted [custom pages](https://starlight.astro.build/guides/pages/#custom-pages).

## 0.4.0

### Minor Changes

- [#16](https://github.com/HiDeoo/starlight-sidebar-topics/pull/16) [`61fee66`](https://github.com/HiDeoo/starlight-sidebar-topics/commit/61fee660dfafff898e5f993ac3b9fe490f88c5cd) Thanks [@HiDeoo](https://github.com/HiDeoo)! - ⚠️ **BREAKING CHANGE:** The minimum supported version of Starlight is now version `0.32.0`.

  Please use the `@astrojs/upgrade` command to upgrade your project:

  ```sh
  npx @astrojs/upgrade
  ```

- [#16](https://github.com/HiDeoo/starlight-sidebar-topics/pull/16) [`61fee66`](https://github.com/HiDeoo/starlight-sidebar-topics/commit/61fee660dfafff898e5f993ac3b9fe490f88c5cd) Thanks [@HiDeoo](https://github.com/HiDeoo)! - ⚠️ **BREAKING CHANGE:** The Starlight Sidebar Topics plugin no longer [overrides](https://starlight.astro.build/guides/overriding-components/) the [`<Pagination>` component](https://starlight.astro.build/reference/overrides/#pagination). If you were manually rendering `starlight-sidebar-topics/overrides/Pagination.astro` in a custom override, you can now remove it.

## 0.3.0

### Minor Changes

- [#11](https://github.com/HiDeoo/starlight-sidebar-topics/pull/11) [`40fe392`](https://github.com/HiDeoo/starlight-sidebar-topics/commit/40fe39223ec15b8bd8631fba899d3a349281598e) Thanks [@HiDeoo](https://github.com/HiDeoo)! - Adds support for Astro v5, drops support for Astro v4.

  ⚠️ **BREAKING CHANGE:** The minimum supported version of Starlight is now `0.30.0`.

  Please follow the [upgrade guide](https://github.com/withastro/starlight/releases/tag/%40astrojs/starlight%400.30.0) to update your project.

  Note that the [`legacy.collections` flag](https://docs.astro.build/en/reference/legacy-flags/#collections) is not supported by this plugin and you should update your collections to use Astro's new Content Layer API.
