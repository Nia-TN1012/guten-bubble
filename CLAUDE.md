# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Project

Guten-bubble is a WordPress plugin that provides a block (`chronoir-net/guten-bubble`) displaying speech bubbles like a chat conversation.
Version 1.0.0 rewrote the block with TypeScript + React (built by Vite, developed with wp-env), while keeping full backward compatibility with the ES5 block of ver. 0.9.x.

Requirements: WordPress 6.6 or later, PHP 7.4 or later.

## Language

* Write code comments, commit messages of this repository and this file in English.
* Communicate with the user in the language set in Claude Code's `language` setting (e.g. Japanese).
* Write documents and dev-logs in Japanese (see [Documents](#documents)).

## Repository layout

| Path | Description |
| --- | --- |
| `guten-bubble/` | The plugin itself. This folder is what gets distributed. |
| `guten-bubble/src/` | TypeScript / SCSS sources (not distributed). |
| `guten-bubble/src/block/` | Block implementation: `attributes.ts`, `render.tsx`, `save.tsx`, `edit.tsx`, `deprecated.tsx`, `settings.ts`. |
| `guten-bubble/src/block/__tests__/` | Backward compatibility tests against the legacy block. |
| `guten-bubble/dist/` | Vite build output (git-ignored, but distributed). |
| `guten-bubble/legacy/` | JavaScript / CSS of ver. 0.9.x. **Never edit these files.** |
| `guten-bubble/languages/` | Translations. Two text domains: `guten-bubble` (block script) and `guten-bubble-admin` (PHP / settings page). |
| `guten-bubble/*.php` | `guten-bubble.php` (entry, asset loading), `settings.php` (Settings API options), `vite-assets.php` (reads `dist/manifest.json`), `options-page.php` (settings page). |
| `guten-bubble/assets/` | Banners and icons for the WordPress.org plugin page (not distributed in the zip). |
| `svn/` | WordPress.org SVN working copy (git-ignored). |

## Commands

```sh
yarn build          # Type check and build guten-bubble/src into guten-bubble/dist
yarn dev            # Rebuild on change (no dev server / HMR; reload the browser)
yarn test           # Vitest: backward compatibility tests
yarn lint           # ESLint
yarn env:start      # wp-env: http://localhost:8080 (admin / password)
yarn env:stop
yarn i18n:update    # Build, generate .pot files, merge them into .po files (requires wp-env)
yarn i18n:compile   # Generate .mo and JSON translation files (requires wp-env)
yarn package        # Create guten-bubble.zip
yarn svn:copy       # Copy the plugin to svn/guten-bubble/trunk and assets to svn/guten-bubble/assets
```

WP-CLI is available through wp-env: `npx wp-env run cli -- wp <command>`.
The plugin is mounted at `wp-content/plugins/guten-bubble` in the container.

Before reporting a change as done, run `yarn build`, `yarn lint`, `yarn test` and `php -l` on changed PHP files.
For changes that affect the editor or the front end, also check them in wp-env.

## Backward compatibility (critical)

Posts created with ver. 0.8.1 - 0.9.x must never become invalid blocks. The block validator compares the saved HTML with the output of `save()`, so:

* The output of `save()` must stay **byte-identical** to `legacy/block_guten-bubble.js`, including class strings with their leading spaces, element order and attribute order. `yarn test` verifies this; keep the tests passing, and add fixtures when touching the markup.
* Do not change attribute definitions in `src/block/attributes.ts` (sources, selectors, defaults, and the non-standard `type: 'bool'`). `chara_name` and `content` use `source: 'children'` on purpose.
* The block uses `apiVersion: 3`. The legacy block (API version 1) got the class `wp-block-chronoir-net-guten-bubble` added to its root element automatically, so `save()` must apply `useBlockProps.save()` to the root element.
* `renderBubble()` is a plain function, not a component, so that `save()` returns the root `<div>` itself (WordPress applies save-props filters to the returned element).
* Deprecations inherit the block's `apiVersion`. Entries for markup saved by the legacy block must set `apiVersion: 1`.
* If the markup ever needs to change, add a new entry to `deprecated` instead of editing the existing save logic.
* Keep the block name, `category` and the absence of `supports` identical to the legacy block.
* Option values stored in posts (select `value`s in `src/block/constants.ts`) must not change.

## Other constraints

* **Legacy toggle**: the `use_legacy_block` option (settings page) switches the editor script, the block style and the settings page style between `dist/` and `legacy/`. Both versions register the same block name, so they must always be loaded exclusively. When `dist/manifest.json` is missing, the legacy files are used.
* **Stable build file names**: `vite.config.ts` disables hashes in output file names, because `wp_set_script_translations()` looks up translation JSON by the MD5 of the script path. Do not re-enable hashing.
* **IIFE wrapper**: build outputs are enqueued as classic scripts, so `vite.config.ts` wraps entry chunks in an IIFE (multiple inputs prevent `output.format: 'iife'`).
* **WordPress globals**: `@wordpress/*` and React are external (`wp.*`, `React`, `ReactJSXRuntime`) via `@kucrut/vite-for-wp`. When importing a new `@wordpress/*` package, add its script handle to the dependencies in `enqueue_block_editor_assets()` in `guten-bubble.php`.
* **Translations**: `languages/guten-bubble-ja-block-guten-bubble.json` is the translation of the legacy script (looked up by the script handle). Keep it.
* **PHP**: keep the code compatible with PHP 7.4 (no union types, `match`, nullsafe operator, etc.).
* **Types**: `@wordpress/block-editor` ships no type definitions for its entry point; minimal declarations are in `src/types/wordpress__block-editor.d.ts`. Extend them as needed.

## Documents

Documents (designs, implementation plans) and dev-logs are stored in a separate private repository, not in this one.

* Location: `$DEV_DOCS_DIR/guten-bubble/`. `DEV_DOCS_DIR` is set in `.claude/settings.local.json` (git-ignored). If it is not set, ask the user for the path.
* Write documents and dev-logs in Japanese.
* **dev-log**: one file per feature branch at `$DEV_DOCS_DIR/guten-bubble/dev-log/<branch name with "/" replaced by "-">.md` (e.g. `feature/vite-wp-env` → `feature-vite-wp-env.md`). Record what was done, decisions and their reasons, findings, verification results and remaining issues, under date headings. Update it at meaningful milestones of the branch.
* **Japanese translation of this file**: `$DEV_DOCS_DIR/guten-bubble/CLAUDE.ja.md`. This file (`CLAUDE.md`) is the source of truth; whenever you change it, update the translation too.
* In the dev-docs repository, always work on the `main` branch. Commit messages are in Japanese. You may commit and push there without asking.

## Git workflow

* Branches:
  * `master` (to be renamed to `main` before the 1.0.0 release): the main branch.
  * `feature/<topic>`: create one from `master` for each piece of work, then merge it into `master`. No pull requests are needed (personal project).
  * `release/<version>`: created from `master` when releasing to the WordPress.org plugin directory.
  * `develop` is no longer used.
* Commit messages: English, a short imperative summary line (e.g. `Add legacy block option`), with details in the body if needed.
* Never commit `dist/`, `svn/`, `guten-bubble.zip` or `.claude/settings.local.json`.

## Actions that require the user's instruction

* Pushing this repository to GitHub.
* Any release work for the WordPress.org plugin directory (`yarn svn:copy`, SVN commits, tagging).
