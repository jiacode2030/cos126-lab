# COS 126 Lab

An interactive study site for COS 126 (Computer Science: An Interdisciplinary Approach), part of [Princeton Labs](https://jiacode2030.github.io/princeton-labs/). There is one module per lecture, in course order. Each has a plain-language explanation, interactive demos (step-through Java tracing, a TOY simulator, a Turing machine, a perceptron and more), a short program with notes, a worked example, common mistakes and a quiz. There is also a Java reference page and exam review practice sets.

> **Unofficial study aid.** Not affiliated with, reviewed by, or endorsed by Princeton University or its Computer Science Department. **Use it to study, not on graded work**, and follow the course's collaboration rules.

## Editing

Plain static files, no build step:

- `index.html` is the page, styles and every demo.
- `content.js` holds the modules, schedule, due dates, reference page and exam data.

Run the checks after editing:

```
node tests/check.js
```

The script opens every view at 360 and 1280 px, clicks every demo control, answers every quiz, and fails on page errors, horizontal scroll, blank canvases, undefined text, duplicate ids or small touch targets. It also checks demo results (TOY, Turing machine, Dijkstra, tracers), progress saving, and the credit and legal lines.

See `CLAUDE.md` for the rules.

## Deploy

Push to `main`. GitHub Pages serves this repo from the root (Settings → Pages → Deploy from a branch → `main` / root).

## Privacy

Progress is saved only in your browser (key `cos-done`). Nothing is counted or tracked. See the [Privacy policy](https://jiacode2030.github.io/princeton-labs/privacy.html) and [Terms of use](https://jiacode2030.github.io/princeton-labs/terms.html).

## Reporting a problem

The **Report an issue** link opens an issue in this repo. Issues are public, so don't include personal information.

© 2026 Jiarui Li. All rights reserved.
