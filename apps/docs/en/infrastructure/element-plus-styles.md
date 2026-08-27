# Element Plus and styling

Admin uses explicit component imports and adds styles on demand at build time. Automatic component imports are not enabled.

## Component imports

Import components explicitly where they are used:

```vue
<script setup lang="ts">
  import { ElButton, ElInput } from 'element-plus'
</script>
```

Explicit dependencies are easier to search, refactor, and evaluate for page cost. They also avoid generating global component types and automatic-import configuration.

Only `ElLoading` is installed globally because the `v-loading` directive requires application-level registration:

```ts
import { ElLoading } from 'element-plus'

app.use(ElLoading)
```

Do not install every Element Plus component with `app.use()` merely for consistency.

## On-demand style imports

The project uses the officially recommended `unplugin-element-plus` to add the required CSS for actual component imports:

```ts
import ElementPlus from 'unplugin-element-plus/vite'

export default defineConfig({
  plugins: [ElementPlus()]
})
```

When adding an Element Plus component, import it normally. If its styles are missing from the build, first check whether the plugin recognized the import name instead of manually importing the entire CSS bundle again in the page.

## Global style entry

The application imports these files in `main.ts`:

```ts
import '@vea/styles'
import 'virtual:uno.css'
```

`@vea/styles` currently contains:

- Element Plus and layout theme variables from `var.css`.
- Element Plus dark-mode CSS variables.
- A minimal reset and a fix for drawer scrollbar width.

Keep page-specific styles in each component's scoped style block. Only design tokens or foundational rules required by multiple applications should enter the shared style package.

## UnoCSS responsibilities

UnoCSS handles page-level atomic styles. Its configuration is located at `apps/admin/uno.config.ts`:

- `presetUno()` provides common atomic rules.
- Dark mode uses the `.dark` class.
- Variant groups support syntax such as `hover:(...)`.

Element Plus provides complex interactive components, UnoCSS handles layout and small visual compositions, and CSS variables drive the theme. With these boundaries in place, there is no need to wrap components such as BaseButton or BaseTable when they only forward props.

## When to create a wrapper

Good candidates include:

- Components shared in several places that contain real interaction rules.
- Entry points that need consistent accessibility, analytics, or error handling.
- Components whose API can be described with a stable, small set of props and events.

Avoid wrappers that:

- Only shorten a single Element Plus tag.
- Merely forward every prop, slot, and event.
- Require business fields to be expressed as complex JSON before rendering a form or table.
- Are used by a single page and are only expected to be reusable someday.

## Style troubleshooting order

When light and dark modes are inconsistent or menu styles look wrong, inspect the layers in this order:

1. Check whether `<html>` has the correct `light` or `dark` class.
2. Check whether semantic variables in `var.css` are defined for both themes.
3. Check whether a component has hard-coded a color or dimension incorrectly.
4. Check whether UnoCSS rules override local styles.
5. Check whether Element Plus styles entered the build on demand.

Fix the variable or the component that owns the layout first. Do not hide a structural problem with a global `!important` rule.
