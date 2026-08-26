# Code standards

The project uses Oxlint for JavaScript, TypeScript, and Vue static analysis, Prettier for consistent formatting, Stylelint for styles, and vue-tsc for type checking.

## Common commands

```bash
pnpm lint               # Run Oxlint across the repository
pnpm lint:fix           # Apply Oxlint fixes
pnpm lint:style         # Apply Stylelint fixes
pnpm typecheck:admin    # Type-check Admin
```

Package-level tests:

```bash
pnpm --filter @vea/hooks test
pnpm --filter @vea/request test
```

These test suites use `esno + node:assert`. There is currently no Vitest or Jest test runner.

## Oxlint

Rules are defined in the root `.oxlintrc.json`. The TypeScript and Vue plugins are enabled, and correctness issues are reported as errors.

Oxlint replaces ESLint. Do not add ESLint configuration or dependencies again. When a rule genuinely needs to be disabled locally, use an Oxlint-supported suppression comment and explain why.

## Formatting

The main conventions in `.prettierrc.json` are:

- Two-space indentation.
- Single quotes.
- No semicolons.
- 100-character line width.
- Indentation inside Vue script and style blocks.

Do not format code manually against these settings; pre-commit lint-staged will format staged files again.

## Styles

Stylelint covers Vue, CSS, Less, SCSS, and HTML files, checking style syntax and common problems.

Theme colors should use CSS variables from `@vea/styles`. Keep component-specific styles scoped, and move only genuinely cross-app foundational rules into packages.

## Git Hooks

Husky registers hooks after dependency installation. Before a commit, it runs:

```text
pnpm typecheck:admin
pnpm lint:lint-staged
```

lint-staged runs Oxlint, Prettier, and Stylelint for the corresponding staged files. Fix type-checking errors instead of carrying them into the branch with `--no-verify`.

Commitlint validates commit messages against Conventional Commits:

```text
feat: add user management
fix: resolve dynamic route refresh
docs: update deployment guide
refactor: simplify request client
```

Common allowed types currently include `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `ci`, `chore`, `revert`, and `wip`.

## TypeScript naming

- Use PascalCase for Vue component files, such as `LocaleDropdown.vue`.
- Prefix Hooks with `useXxx`, such as `useCrud`.
- Name API functions with a verb, domain, and `Api`, such as `getRouteListApi`.
- Use PascalCase for types without an `I` prefix, such as `LoginParams` and `ApiResponse`.
- Prefix booleans with readable words such as `is`, `has`, `can`, or `should`.
- Use UPPER_SNAKE_CASE for constants only when the value is genuinely global and constant.

Keep types close to their domain modules. The Request layer should contain protocol types only, not the business models for every page.

## Imports and directories

- Inside an application, use `@/` to refer to `apps/admin/src`.
- Import shared capabilities through `@vea/*` package names instead of reaching across directories into package source files.
- Keep API functions and types for the same domain in adjacent directories.
- Hooks are flattened under `src/hooks`; do not add a `web/` directory with only one level of content.
- Do not extract utils before they have real reuse value.

## Script caveat

- `npm:check` updates dependency versions directly; it is not a read-only check.

CI must not invoke `npm:check`. Use `pnpm lint:format` when the entire workspace needs consistent formatting.
