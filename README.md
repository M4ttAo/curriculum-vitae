# Matteo Cavalli — CV

Personal CV and portfolio website built with Jekyll.

The project is inspired by [Umberto Calò's CV website](https://umbertocalo.dpdns.org/) and [curriculum-vitae repository](https://github.com/umbertocalo/curriculum-vitae), adapted with my own content, styling and deployment workflow.

## Stack

- Jekyll
- Liquid
- YAML / Markdown
- SCSS
- GitHub Actions
- Puppeteer
- Cloudflare Workers

## Content

Most CV content is stored in `_data/`:

- `profile.yml`
- `skills.yml`
- `experience.yml`
- `projects.yml`
- `certifications.yml`
- `education.yml`
- `tags.yml`

Pages and sections are rendered through reusable layouts and includes.

## PDF

The printable CV is available at `/cv/`.

The PDF is generated automatically by GitHub Actions using Puppeteer and saved as:

```text
assets/cv.pdf
```

## Deployment

The repository uses two branches:

```text
main
  ↓
GitHub Actions
  ↓
generate CV PDF
  ↓
deploy
  ↓
Cloudflare Workers
```

`main` is the development branch.

The `deploy` branch is generated automatically and contains the updated PDF. Cloudflare builds and deploys the site from this branch.

### Cloudflare

Build command:

```bash
bundle exec jekyll build
```

Deploy command:

```bash
npx wrangler deploy --assets ./_site
```

## Local development

Install dependencies:

```bash
bundle install
npm install
```

Run the site locally:

```bash
bundle exec jekyll serve
```

Generate the PDF locally:

```bash
bundle exec jekyll build
npm run generate:pdf
```

---

Inspired by the work of [Umberto Calò](https://github.com/umbertocalo).
