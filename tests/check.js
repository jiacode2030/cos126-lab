/* Checks COS 126 Lab in Chromium at 360 and 1280 px: every view loads without errors, nothing overflows,
   every demo control works, quizzes answer, progress saves under cos-done, and the legal/credit lines are present.
   Run: node tests/check.js   (needs Node.js and Playwright; serves the repo on a local port) */
const path = require('path'), fs = require('fs'), http = require('http');
let chromium; try { ({ chromium } = require('playwright')); } catch (e) { ({ chromium } = require(require('child_process').execSync('npm root -g').toString().trim() + '/playwright')); }
const ROOT = path.join(__dirname, '..'), OUT = process.env.SHOTS || path.join(ROOT, 'tests', 'shots');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' };
let fails = 0; const fail = (...a) => { fails++; console.log('FAIL', ...a); };
const ok = (c, ...a) => c ? console.log('ok  ', ...a) : fail(...a);

const server = http.createServer((q, r) => {
  let u = decodeURIComponent(q.url.split('?')[0]).replace(/^\/cos126-lab/, '');
  const f = path.join(ROOT, u.replace(/\/$/, '/index.html'));
  if (!f.startsWith(ROOT) || !fs.existsSync(f)) { r.writeHead(404); return r.end(); }
  r.writeHead(200, { 'content-type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(r);
});

(async () => {
  await new Promise(r => server.listen(0, r));
  const BASE = `http://localhost:${server.address().port}/cos126-lab/`;
  fs.mkdirSync(OUT, { recursive: true });
  const b = await chromium.launch();
  const ids = await (async () => { const p = await b.newPage(); await p.goto(BASE); const x = await p.evaluate(() => window.COS.modules.map(m => m.id)); await p.close(); return x; })();
  ok(ids.length === 22, 'modules:', ids.length);

  for (const w of [1280, 360]) {
    const ctx = await b.newContext({ viewport: { width: w, height: 900 } });
    const p = await ctx.newPage(); let errs = [];
    p.on('pageerror', e => errs.push(e.message));
    p.on('console', m => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)|ERR_(TUNNEL|NAME|CONNECTION|PROXY)|Failed to load resource/.test(m.text())) errs.push(m.text()); });
    await p.goto(BASE); await p.evaluate(() => localStorage.clear());
    for (const r of ['overview', 'reference', 'exams', ...ids]) {
      errs = [];
      await p.goto(BASE + '#' + r); await p.waitForTimeout(150);
      const tag = `${w}px #${r}`;
      /* click through every demo control */
      const n = await p.$$eval('.demo button:not([disabled])', x => x.length);
      for (let i = 0; i < n; i++) {
        const bs = await p.$$('.demo button');
        if (!bs[i]) break;
        if (await bs[i].isVisible() && await bs[i].isEnabled()) { await bs[i].click({ timeout: 2000 }).catch(() => {}); }
      }
      if (r === 'exams') { await p.click('[data-x="1"]'); await p.waitForTimeout(100); ok(await p.$$eval('#xq .q', q => q.length) === 10, tag, 'practice set has 10 questions'); }
      /* run every tracer to the end and back */
      for (const e of await p.$$('[data-a="end"]')) if (await e.isEnabled()) await e.click();
      for (const e of await p.$$('[data-a="reset"]')) if (await e.isEnabled()) await e.click();
      /* answer each quiz question with its first option */
      for (const q of await p.$$('.q')) { const o = await q.$('.opt:not([disabled])'); if (o) await o.click(); }
      await p.waitForTimeout(50);
      ok(!(await p.evaluate(() => document.documentElement.scrollWidth > innerWidth)), tag, 'no horizontal scroll');
      ok(!/undefined|\[object|Infinity ms|null ms/.test(await p.evaluate(() => document.body.innerText.replace(/1\.0 \/ 0[\s\S]{0,40}Infinity/g, ''))), tag, 'no undefined/[object text');
      const dup = await p.evaluate(() => { const s = {}; return [...document.querySelectorAll('[id]')].map(e => e.id).filter(i => s[i] ? 1 : (s[i] = 1, 0)); });
      ok(!dup.length, tag, 'no duplicate ids', dup.join(','));
      const blank = await p.evaluate(() => [...document.querySelectorAll('canvas')].filter(c => { const g = c.getContext('2d'); const d = g.getImageData(0, 0, c.width, c.height).data; for (let i = 3; i < d.length; i += 4) if (d[i]) return false; return true; }).length);
      ok(!blank, tag, 'no blank canvases', blank || '');
      const small = await p.evaluate(() => [...document.querySelectorAll('#view button, #view a.btn, #view .pn a')].filter(e => e.offsetParent).map(e => { const r = e.getBoundingClientRect(); return [e.textContent.trim().slice(0, 18), Math.round(r.width), Math.round(r.height)]; }).filter(([, W, H]) => W < 44 || H < 44));
      ok(!small.length, tag, 'touch targets >= 44px', small.length ? JSON.stringify(small.slice(0, 4)) : '');
      if (ids.includes(r)) ok(await p.$$eval('.q .why:not([hidden])', x => x.length) === await p.$$eval('.q', x => x.length), tag, 'every quiz question shows feedback');
      ok(!errs.length, tag, 'no page errors', errs.join(' | '));
      if (['overview', 'loops', 'toy2', 'perceptron', 'creating-types', 'algorithms'].includes(r) || r === 'overview') await p.screenshot({ path: path.join(OUT, `cos126-${r}-${w}.png`), fullPage: false });
    }
    await ctx.close();
  }

  /* behaviour */
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 } }); const p = await ctx.newPage();
  await p.goto(BASE + '#loops'); await p.evaluate(() => localStorage.clear()); await p.reload();
  await p.click('#done');
  ok(await p.evaluate(() => JSON.parse(localStorage.getItem('cos-done')).loops === 1), 'mark as done saves cos-done.loops');
  ok((await p.textContent('#rprog')).trim() === '1 of 22 modules done', 'rail progress updates');
  ok(await p.evaluate(() => Object.keys(localStorage).every(k => k.startsWith('cos-'))), 'only cos- keys written');
  /* tracer values */
  await p.click('.demo [data-v="2"]'); await p.click('.demo [data-a="end"]');
  ok((await p.textContent('.demo .outbox pre')).trim() === '0 1\n1 2\n2 4', 'loops tracer output for n = 2');
  /* TOY: multiply 3 * 9 = 001B, stdin sum = 0012 */
  await p.goto(BASE + '#toy2'); await p.click('.demo [data-a="run"]');
  ok(await p.evaluate(() => [...document.querySelectorAll('.mem tr')].some(r => r.cells[0].textContent === '32' && r.cells[1].textContent === '001B')), 'TOY multiply leaves 001B at M[32]');
  await p.click('.demo [data-p="1"]'); await p.click('.demo [data-a="run"]');
  ok((await p.textContent('.demo .outbox pre')).trim() === '0012', 'TOY stdin sum prints 0012');
  await p.goto(BASE + '#toy1'); await p.click('.demo [data-p="1"]'); await p.click('.demo [data-a="run"]');
  ok(await p.evaluate(() => [...document.querySelectorAll('.mem tr')].some(r => r.cells[0].textContent === '17' && r.cells[1].textContent === 'FFFD')), 'TOY 5 - 8 = FFFD');
  /* Turing machine 1011 + 1 = 1100 */
  await p.goto(BASE + '#theory'); await p.click('.demo [data-a="end"]');
  ok(/1100\./.test(await p.textContent('.demo .msg')), 'TM increments 1011 to 1100');
  /* Dijkstra */
  await p.goto(BASE + '#data-structures'); await p.click('.demo:nth-of-type(2) [data-a="end"]');
  ok(/value is <b>101<\/b>|value is 101/.test(await p.innerHTML('.demo:nth-of-type(2) .msg')), 'Dijkstra evaluates to 101');
  /* recursion trace */
  await p.goto(BASE + '#recursion'); await p.click('.demo [data-v="5"]'); await p.click('.demo [data-a="end"]');
  ok((await p.textContent('.demo .outbox pre')).trim() === '120', 'factorial(5) = 120');
  /* footer and legal lines on the overview */
  await p.goto(BASE);
  const t = await p.textContent('#view');
  ok(/Built by Jiarui Li · Princeton Class of 2030 · a student project/.test(t) && /© 2026 Jiarui Li/.test(t) && /Last updated/.test(t) && /Use it to study, not on graded work/.test(t) && /not affiliated with/i.test(t), 'credit, copyright, last updated, legal text');
  ok(await p.evaluate(() => !!document.querySelector('a[href="/princeton-labs/privacy.html"]') && !!document.querySelector('a[href="/princeton-labs/terms.html"]') && !!document.querySelector('a.more[href="/princeton-labs/"]')), 'privacy, terms and More labs links');
  ok(await p.evaluate(() => !/goatcounter|google-analytics|gtag\(/.test(document.documentElement.outerHTML)), 'no analytics');
  /* search */
  await p.fill('#ms', 'TOY'); ok((await p.$$eval('#nav a', a => a.map(x => x.textContent.trim()))).join() === 'TOY I,TOY II,Java reference', 'search finds TOY modules and the reference page');
  for (const [term, want] of [['aliasing', 'Arrays'], ['readInt', 'Input and output'], ['StackOverflowError', 'Recursion'], ['overloading', 'Functions'], ['immutable', 'Using data types'], ['Math.random', 'Conditionals'], ['vocabulary', 'Exam review']]) {
    await p.fill('#ms', term);
    ok((await p.$$eval('#nav a', a => a.map(x => x.textContent.trim()))).includes(want), `search "${term}" finds ${want}`);
  }
  await p.fill('#ms', '');
  /* exam notes */
  const withNotes = await p.evaluate(() => window.COS.modules.filter(m => m.notes).map(m => m.id).join());
  ok(withNotes === 'hello,types,conditionals,loops,arrays,io,functions,recursion,performance,using-types,creating-types', 'exam notes on 11 modules', withNotes);
  await p.goto(BASE + '#arrays');
  ok(await p.isVisible('#s-notes .trap') && await p.isVisible('[data-go="s-notes"]'), 'Arrays shows Exam notes with a trap line and a section button');
  ok(await p.evaluate(() => window.COS.modules.flatMap(m => m.quiz).filter(q => q.trap).length) === 27, '27 exam-trap questions');
  await p.goto(BASE + '#exams');
  ok(JSON.stringify(await p.$$eval('#view section.part h2', h => h.map(x => x.textContent))) === JSON.stringify(['Exam-day checklist', 'Writing code by hand', 'Vocabulary', 'Past exam answers']), 'exam review study-note sections');
  ok(await p.$$eval('#x-past .tag', t => t.some(x => x.textContent === 'derived') && t.some(x => x.textContent === 'official key')), 'derived and official key labels shown');
  await p.click('[data-x="2"]'); await p.waitForTimeout(100);
  ok(await p.$$eval('#xq .q', q => q.length) === 10, 'Exam traps practice set has 10 questions');
  await b.close(); server.close();
  console.log(fails ? `\n${fails} failed` : '\nall checks passed'); process.exit(fails ? 1 : 0);
})();
