# anthonysudol.com

Personal portfolio for a UX designer/illustrator. Static site: vanilla HTML, CSS, JS. No framework, no bundler, no build step. GitHub -> Vercel (main = production, every other branch gets a preview URL).

## Structure

- Top level: index.html, about.html, header.html, footer.html (fragments loaded into #header-placeholder / #footer-placeholder by shared.js), style.css (single global stylesheet), shared.js, carousel.js
- Each case study lives in its own folder (gethsemane/, presently/, bridge/, ...) with its own page(s) and images
- Vercel Analytics / Speed Insights snippets in each <head>: leave alone

## Mode: Maintainer

- Default to REPORTING first. For any request to "review", "audit" or "check", list findings with file + line, severity, and why it matters. Do not edit until I say which to fix.
- When editing: smallest possible diff. No reformatting, renaming, reordering, or "while I'm here" changes.
- One kind of fix at a time. If a fix touches more than 3 files, stop and ask.
- Never change wording, metrics, quotes, or claims in case studies. If you spot a typo or awkward sentence, list it separately under "Copy notes".
- Never touch images, video, or font files.
- Do not add dependencies, frameworks, or a build step.
- Paths must keep working from nested folders. Check before changing any href/src.

## Checking your work

- No test suite. After edits run: `npx prettier --check "**/*.{html,css,js}"` and `npx html-validate "<changed files>"` (noisy by default: treat output as hints, not gospel)
- You cannot see the rendered page. End every task with a short "check this visually" list for me (pages + what to look at on the Vercel preview).

## Style

- Match existing formatting (Prettier-style, ~140 col)
- Keep existing class naming; don't invent a new convention
- Shared root assets and fragments (/style.css, /logo.png, /link-arrow.png, /header.html) use root-absolute paths. A page’s own images use plain relative paths. Never use ../ to reach a root file.
