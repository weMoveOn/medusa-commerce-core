# typedoc-plugin-custom

A Typedoc plugin that combines utility plugins for documenting references.

## Configurations

### Resolve Reference Configurations

The [`resolve-reference-plugin`](./src/resolve-references-plugin.ts) imitates the [`typedoc-plugin-missing-exports`](https://www.npmjs.com/package/typedoc-plugin-missing-exports) plugin. So, it accepts the same options as the [`typedoc-plugin-missing-exports`](https://www.npmjs.com/package/typedoc-plugin-missing-exports) plugin.

### Frontmatter

`frontmatterData` is an object of key-value pairs. If none provided, no frontmatter variables will be added to the Markdown files.

An example of passing it in a JavaScript configuration file:

```js
frontmatterData: {
  displayed_sidebar: "jsClientSidebar",
},
```

### API Ignore

The `ignoreApi` option is a boolean that indicates whether reflections with the `@apiIgnore` tag should be ignored. If enabled, reflections having this tag are removed from the generated documentation. If disabled (which is the default), the `@apiIgnore` tag is removed from the reflection to ensure it's not shown in the generated documentation.

### ESLint

If the `eslintPathName` option is set, code snippets provided in `@example` tag are linted based on the documentation's ESLint rules.

The following options are useful for linting:

- `eslintPathName`: The path to the ESLint configuration file.
- `pluginsResolvePath`: The path to resolve plugins used in the ESLint configuration files.

---

## Build the Plugin

Before using any command that makes use of this plugin, make sure to run the `build` command:

```bash
yarn build
```
