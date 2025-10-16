# starlight-sidebar-topics

## 0.6.2

### Patch Changes

- [#48](https://github.com/HiDeoo/starlight-sidebar-topics/pull/48) [`e5163eb`](https://github.com/HiDeoo/starlight-sidebar-topics/commit/e5163eb17f1fdcafa73339fcece28166d7a8aa55) Thanks [@HiDeoo](https://github.com/HiDeoo)! - Setups trusted publishing using OpenID Connect (OIDC) authentication — no code changes.

## 0.6.1

### Patch Changes

- [#41](https://github.com/HiDeoo/starlight-sidebar-topics/pull/41) [`cc18784`](https://github.com/HiDeoo/starlight-sidebar-topics/commit/cc18784084031d502674cf7d1b5949ce906c5cb8) Thanks [@InertSloth](https://github.com/InertSloth)! - Exports the `StarlightSidebarTopicsUserOptions` type matching the [plugin configuration object](https://starlight-sidebar-topics.netlify.app/docs/configuration/#plugin-configuration).

- [#37](https://github.com/HiDeoo/starlight-sidebar-topics/pull/37) [`c45840c`](https://github.com/HiDeoo/starlight-sidebar-topics/commit/c45840cff23701ccb34c02a8ae0b7bbc00cf282c) Thanks [@angelikatyborska](https://github.com/angelikatyborska)! - Fixes a potential type issue for users manually running `tsc` in their projects.

## 0.6.0

### Minor Changes

- [#29](https://github.com/HiDeoo/starlight-sidebar-topics/pull/29) [`5c337bc`](https://github.com/HiDeoo/starlight-sidebar-topics/commit/5c337bc67ce2131e20408d213f876a5a96543f3e) Thanks [@HiDeoo](https://github.com/HiDeoo)! - Adds a route data object accessible on Starlight pages using `Astro.locals.starlightSidebarTopics` containing information about all the topics configured in your project. This can be useful to create custom topic lists to replace the built-in topic list.

  See the [“Custom Topic List” guide](https://starlight-sidebar-topics.netlify.app/docs/guides/custom-topic-list/) for more information.

- [#29](https://github.com/HiDeoo/starlight-sidebar-topics/pull/29) [`5c337bc`](https://github.com/HiDeoo/starlight-sidebar-topics/commit/5c337bc67ce2131e20408d213f876a5a96543f3e) Thanks [@HiDeoo](https://github.com/HiDeoo)! - Adds a new [`topics`](https://starlight-sidebar-topics.netlify.app/docs/configuration#topics) plugin configuration option to map topic identifiers to a list of pages or glob patterns that should be associated with the topic.

  This option can be useful for custom pages generated and included in the sidebar by other plugins that have no knowledge of the Starlight Sidebar Topics plugin that should be associated with a specific topic.

  See the [“Unlisted Pages”](https://starlight-sidebar-topics.netlify.app/docs/guides/unlisted-pages) guide to learn more about how to associate pages with a specific topic.

## 0.5.1

### Patch Changes

- [#25](https://github.com/HiDeoo/starlight-sidebar-topics/pull/25) [`ca87a7b`](https://github.com/HiDeoo/starlight-sidebar-topics/commit/ca87a7b7b1f945d7b1aeab07576a2cbfb3040156) Thanks [@HiDeoo](https://github.com/HiDeoo)! - Adds the `.starlight-sidebar-topics` CSS class around the sidebar topics list to make it easier to style it.

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
