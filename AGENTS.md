# Project Instructions

## Competencies

- Do not add, remove, rename, or modify competencies in `_data/profile.yml` unless explicitly requested.

## Tag Colors

- Define tag membership and category color only in `_data/tags.yml`.
- Assign each category a color name such as `blue`, `cyan`, `green`, `orange`, `purple`, or `slate` in `_data/tags.yml`.
- Define the HEX tones for those color names only in `_sass/_variables.scss`.
- Keep `_sass/_tags.scss` generic for category color rendering. Do not define colors for individual tags elsewhere.
- When adding a tag, add it to the appropriate category in `_data/tags.yml` and assign or inherit that category's color.

## Ruby and Jekyll

- Use Ruby `3.4.10` for local development and CI.
- Keep the Ruby version aligned with `.ruby-version`, `Gemfile`, and `.github/workflows/generate-cv.yml`.
- Build the site with `bundle exec jekyll build`.
- Run the local preview with `bundle exec jekyll serve`.
- Do not use a system Ruby version older than `3.0` for this project.
- Cloudflare deploys the generated `_site/` directory; do not replace the Jekyll build with a different build path.
