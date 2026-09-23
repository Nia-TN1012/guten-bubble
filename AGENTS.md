# AGENTS.md

Instructions for AI coding agents (Codex, Cursor and others) working in this repository.

**[`CLAUDE.md`](./CLAUDE.md) is the single source of truth for this project.** Read it before starting any work, and follow all of its rules as if they were addressed to you. This file only adds notes for agents other than Claude Code; do not duplicate rules here.

## Notes for agents other than Claude Code

* **Language**: `CLAUDE.md` refers to Claude Code's `language` setting. Reply to the user in the language they use (e.g. Japanese). Code comments and commit messages of this repository are in English, and documents / dev-logs are in Japanese, as described in `CLAUDE.md`.
* **`DEV_DOCS_DIR`**: Claude Code gets this environment variable from `.claude/settings.local.json` (git-ignored). If it is not set in your environment, read `env.DEV_DOCS_DIR` from that file. If the file or the key does not exist, ask the user for the path. Do not commit that file.
* **Actions that require the user's instruction** (pushing this repository to GitHub, and any release work for the WordPress.org plugin directory) apply to you as well.
* If you find that `CLAUDE.md` is outdated or wrong, update `CLAUDE.md` itself (and its Japanese translation, as described there) rather than this file.
