# GitHub Copilot / AI Agent Instructions for qtekfun.github.io

Purpose
- Help an AI coding agent be immediately productive editing and extending this Jekyll-powered personal site.

Big picture (what this repo is)
- Static site built with Jekyll (see `Gemfile` and `_config.yml`).
- Content is organized as Jekyll posts under `_posts/` with subfolders for topical grouping (for example `_posts/computer-things/` and `_posts/software-development/`).
- Presentation/templates are simple HTML includes and top-level pages (`index.html`, `categories.html`) plus `_includes/` fragments.

Key files & directories (read these first)
- `_config.yml` — global Jekyll settings and plugins; primary source of site configuration.
- `Gemfile` — Ruby/Gems required to build locally (Bundler-managed).
- `_posts/` — markdown posts. Filenames use the Jekyll pattern `YYYY-MM-DD-title.md` and often include front matter (title, categories, layout).
- `_includes/codeHeader.html` — example include used for code blocks or headers; edit here to change code block appearance globally.
- `assets/` — static assets grouped by category; common pattern: `assets/<category>/<post-slug>/` stores images used by that post.
- `assets/scripts/copyCode.js` — a small helper script (review before changing post content that references it).

Developer workflows (how to build, serve, and test locally)
- Install Ruby and Bundler, then run: `bundle install`.
- To build locally: `bundle exec jekyll build`.
- To preview with live reload (recommended during edits): `bundle exec jekyll serve --livereload`.
- On Windows (pwsh), run the same commands in PowerShell after ensuring Ruby is in PATH. If `bundle` fails, verify Ruby/Bundler installation.

Project-specific conventions and patterns
- Posts: Keep posts under `_posts/<category>/` with the date-prefixed filename. Front matter typically contains `title`, `categories` (or `category`), and may include other metadata.
- Images: Put per-post images under `assets/<category>/<YYYY-MM-DD-post-slug>/` and reference them with relative paths from the post.
- Includes: Reusable small HTML fragments live in `_includes/`. Modify includes (for example `codeHeader.html`) to affect many posts.
- Keep content (posts) and presentation (includes/templates) clearly separated: edits to layout should be done in `_includes` or top-level HTML files, not by changing each post.

Integration points & external dependencies
- GitHub Pages / Jekyll plugins driven by the `Gemfile` and `_config.yml` — any change to gems may require `bundle update`.
- No CI configuration detected in this repository (no `.github/workflows`); publishing is expected through GitHub Pages on pushes.

When making changes, example tasks & precise guidance
- Add a post: create ` _posts/<category>/YYYY-MM-DD-title.md` with YAML front matter and place images in `assets/<category>/<title-slug>/`.
- Update code block styling: edit `_includes/codeHeader.html` and verify a representative post renders correctly with `bundle exec jekyll serve`.
- Move or rename assets: update references in the post markdown and run a local build to confirm links.
- Changing site config: edit `_config.yml`, then run a local build — many config changes affect the site immediately after rebuild.

Prompt examples for an AI agent (use these when editing)
- "Update `_includes/codeHeader.html` to add a CSS class `copyable` and update any posts using code snippets to include that class."  (Then run `bundle exec jekyll serve` locally.)
- "Add an image to the post `2024-01-07-first-time-in-fedora.md`: place the file at `assets/computer-things/2024-01-07-first-time-in-fedora/` and update the post's markdown image path accordingly." 

What to avoid / assumptions to verify
- Don’t assume a CI pipeline; confirm deployment settings in the GitHub repository if automating deploys.
- Verify Ruby/Bundler versions if installs fail — do not change `Gemfile` without testing locally.

If you edit files, run these local checks
- `bundle exec jekyll build` — confirm no build errors.
- `bundle exec jekyll serve --livereload` — visually inspect changed pages.

If anything in these notes is out-of-date or you want more detail about a workflow, tell me which area to expand (build, posts, assets, templates, or deployment) and I will iterate.
