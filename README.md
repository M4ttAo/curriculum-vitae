# 📄 CV / Personal Website

A **minimalist and responsive** personal website built to manage and showcase my Curriculum Vitae, professional experience, projects and technical background.

The project is designed to keep content separated from presentation, making the CV easy to maintain and extend over time.

**Live at**: [mattao.net](https://mattao.net)

## 🎨 Inspiration and Credits

- **Structure and concept**: inspired by [Umberto Calò's curriculum-vitae](https://github.com/umbertocalo/curriculum-vitae) and [davidepucci.it](https://davidepucci.it/)
- **Design philosophy**: minimalist, typography-focused and content-first
- **Development**: built with the help of AI for architecture, styling and implementation

## 🏗️ Repository Structure

### Tech Stack

- **Static Site Generator**: [Jekyll](https://jekyllrb.com/)
- **Templating**: Liquid
- **Content**: YAML and Markdown
- **Styling**: SCSS
- **JavaScript**: vanilla JavaScript for the light/dark theme
- **Fonts**: Inter and JetBrains Mono
- **Version Control**: Git / GitHub
- **Hosting**: Cloudflare Workers Static Assets
- **DNS / Domain**: Cloudflare
- **CI/CD**: Cloudflare Workers Builds connected to GitHub

### File Structure

```text
.
├── _config.yml
│
├── _data/
│   ├── profile.yml
│   ├── skills.yml
│   ├── experience.yml
│   ├── projects.yml
│   ├── certifications.yml
│   ├── education.yml
│   └── tags.yml
│
├── _includes/
│   ├── head.html
│   ├── header.html
│   ├── footer.html
│   ├── hero.html
│   ├── contact.html
│   ├── skills.html
│   ├── experience.html
│   ├── projects.html
│   ├── certifications.html
│   ├── education.html
│   └── tag-badge.html
│
├── _layouts/
│   ├── default.html
│   └── page.html
│
├── _sass/
│   ├── _variables.scss
│   ├── _base.scss
│   ├── _typography.scss
│   ├── _layout.scss
│   ├── _components.scss
│   ├── _tags.scss
│   ├── _curriculum-vitae.scss
│   └── _utilities.scss
│
├── about/
│   └── index.md
│
├── assets/
│   ├── css/
│   │   └── main.scss
│   ├── js/
│   │   └── theme-toggle.js
│   └── cv.pdf
│
├── index.md
├── Gemfile
├── package.json
└── wrangler.jsonc
```

## 🎯 Design Philosophy

- ✅ **Content separated from presentation** — CV data is stored in `_data/*.yml`
- ✅ **Reusable components** — each CV section is implemented as an independent Liquid include
- ✅ **Modular SCSS** — styles are separated by responsibility
- ✅ **Minimal JavaScript** — only the light/dark theme requires client-side JavaScript
- ✅ **No frontend framework** — no React, Vue, Bootstrap or Tailwind
- ✅ **Responsive design** — optimized for desktop and mobile
- ✅ **Typography-first** — Inter for primary content and JetBrains Mono for metadata and technical elements
- ✅ **Automatic deployment** — pushes to the production branch trigger a Cloudflare build and deployment

## ⚡ Local Setup

### Requirements

- Ruby
- Bundler
- Node.js / npm

### Installation

Clone the repository:

```bash
git clone <repository-url>
cd <repository-directory>
```

Install Ruby dependencies:

```bash
bundle install
```

Start the local Jekyll server:

```bash
bundle exec jekyll serve
```

The website will be available at:

```text
http://localhost:4000
```

## 📝 Updating Content

All CV content is stored inside `_data/`.

| File                 | Content                                     |
| -------------------- | ------------------------------------------- |
| `profile.yml`        | Name, role, bio and contact information     |
| `skills.yml`         | Technical skills grouped by area            |
| `experience.yml`     | Professional experience and roles           |
| `projects.yml`       | Selected professional and personal projects |
| `certifications.yml` | Certifications and technical training       |
| `education.yml`      | Education                                   |
| `tags.yml`           | Tag-to-color mapping                        |

### Experience example

```yaml
- company: "Company"
  location: "Milan"

  roles:
    - title: "Role"
      period: "2020 - Present"

      description: >
        - First responsibility.

        - Second responsibility.
```

### Skills example

```yaml
- group: "Collaboration"
  items:
    - "Cisco CUCM"
    - "Webex"
    - "Video Conferencing"
```

### Projects example

```yaml
- title: "Project"

  period: "4 months"

  description: >
    - Project activity.

    - Additional activity.

  tags:
    - "Python"
    - "Automation"
```

## 🎨 Tag Colors

Tags are mapped to colors through `_data/tags.yml`.

The current categories are:

| Area                     | Color  |
| ------------------------ | ------ |
| Collaboration            | Blue   |
| Voice / SBC              | Cyan   |
| Contact Center           | Purple |
| Automation / Development | Green  |
| Cloud / Containers       | Orange |
| Networking               | Slate  |

Tags not explicitly configured use the neutral/default style.

Example:

```yaml
Cisco CUCM: blue
Oracle SBC: cyan
Genesys BYOC: purple
Python: green
Kubernetes: orange
Networking: slate
```

## 🌗 Light / Dark Theme

The website supports light and dark themes.

The selected preference is stored in the browser using `localStorage`.

If no preference has been saved, the website follows the operating system theme.

## 📄 CV PDF

The downloadable CV is stored at:

```text
assets/cv.pdf
```

The header exposes it through the `↓ pdf` button.

At the moment the PDF can be updated by replacing this file.

Automatic PDF generation can be added later as part of the build pipeline.

## 🚀 Deployment

The GitHub repository is connected directly to Cloudflare Workers Builds.

### Build command

```bash
bundle exec jekyll build
```

Jekyll generates the static website inside:

```text
_site/
```

### Deploy command

```bash
npx wrangler deploy --assets ./_site
```

The deployment flow is:

```text
git push
    ↓
GitHub
    ↓
Cloudflare Workers Builds
    ↓
Jekyll build
    ↓
_site/
    ↓
Wrangler deploy
    ↓
mattao.net
```

Every push to the configured production branch automatically triggers a new build and deployment.

## 🌐 Website Structure

Current pages:

```text
https://mattao.net/
https://mattao.net/about/
```

The architecture is designed to allow additional sections in the future without restructuring the project.

Possible future pages include:

```text
/projects/
/notes/
/lab/
```

## 📜 License and Attribution

- Structure and design inspiration: [Umberto Calò](https://github.com/umbertocalo/curriculum-vitae) and [Davide Pucci](https://davidepucci.it/)
- Fonts: Inter and JetBrains Mono
- Content: © 2026 Matteo Cavalli
