# COS 126 Lab — notes for Claude Code

Interactive study site for Princeton COS 126. Part of Princeton Labs (`jiacode2030/princeton-labs`). Served by GitHub Pages from `main` / root.

`index.html` (page, styles, demo engine) and `content.js` (modules and data) are the source, edited directly. No build step. `index.html` must stay a full HTML document (doctype, charset, viewport).

## Rules
- Princeton Labs only. No AP content or wording and no links to AP Labs.
- Keep: the rail logo and More labs link (`/princeton-labs/`), the credit "Built by Jiarui Li · Princeton Class of 2030 · a student project" as plain text (no LinkedIn link or button), once only, on the overview, © 2026 Jiarui Li, Last updated (`COS.updated` in content.js), Privacy/Terms links (`/princeton-labs/privacy.html`, `/princeton-labs/terms.html`), and the legal text: not affiliated with Princeton University, "Use it to study, not on graded work", and the collaboration rules. Update Last updated when content changes.
- No analytics of any kind. Nothing is counted or tracked.
- Look: the same as the other Princeton Labs sites. Light theme only, IBM Plex Sans / STIX Two Text / IBM Plex Mono, one blue accent `#2457A6`, white cards on `#F4F6F8`. No decorative motion; demos may animate.
- Modules follow the COS 126 schedule (weeks and due dates in content.js). Don't post solutions to graded assignments (for example, the full Perceptron class for Image Classifier).
- localStorage keys start with `cos-` (progress in `cos-done`, read by the Princeton Labs landing page). Never use another site's prefix.
- Report links open issues in this repo.
- Show the owner a screenshot before pushing, and push only when they say "push".

## Checks (run before every push)
- `node tests/check.js` (uses the installed Playwright and Chromium).
