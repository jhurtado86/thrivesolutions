import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
  Full-page capture in the FINAL revealed state.
  Usage: node screenshot.mjs http://localhost:3001/[path] [label] [width]
  Output: ./temporary screenshots/screenshot-N[-label].png

  1. Scroll through the whole page in steps so every IntersectionObserver
     fires naturally (.reveal → .is-in) and every loading="lazy" image is
     requested, then return to the top.
  2. Wait for the network to settle and for images to decode; warn about
     any image that still has not loaded so a blank frame is never mistaken
     for a design problem.
  3. Belt and braces: force .is-in on any reveal the observer missed and
     zero every transition so the capture shows end states, not mid-motion.
*/

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const url   = process.argv[2] || 'http://localhost:3000';
const label = process.argv[3] ? `-${process.argv[3]}` : '';
const width = process.argv[4] ? parseInt(process.argv[4], 10) : 1440;
const dir   = path.join(__dirname, 'temporary screenshots');

if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

let n = 1;
while (fs.existsSync(path.join(dir, `screenshot-${n}${label}.png`))) n++;
const outPath = path.join(dir, `screenshot-${n}${label}.png`);

const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
const page = await browser.newPage();
await page.setViewport({ width, height: 900, deviceScaleFactor: 1, isMobile: width < 768 });
await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

// 1. Step through the page (viewport-sized steps, a beat between each) so
//    reveals trigger the way they would on a real scroll, then go back up.
await page.evaluate(async () => {
  const step = Math.max(240, Math.round(window.innerHeight * 0.6));
  for (let y = 0; y <= document.documentElement.scrollHeight; y += step) {
    window.scrollTo(0, y);
    await new Promise((r) => setTimeout(r, 110));
  }
  window.scrollTo(0, document.documentElement.scrollHeight);
  await new Promise((r) => setTimeout(r, 250));
});

// 2. Let lazy images settle, then decode them (bounded so a hung request
//    can never stall the capture). Report anything still missing.
await page.waitForNetworkIdle({ idleTime: 600, timeout: 20000 }).catch(() => {});
await Promise.race([
  page.evaluate(() => Promise.all(
    [...document.images].map((img) => img.complete ? Promise.resolve() : img.decode().catch(() => {}))
  )),
  new Promise((r) => setTimeout(r, 6000)),
]);
const missing = await page.evaluate(() =>
  [...document.images].filter((img) => !img.complete || img.naturalWidth === 0).map((img) => img.currentSrc || img.src)
);
if (missing.length) console.warn(`WARNING: ${missing.length} image(s) did not load:\n  ${missing.join('\n  ')}`);

// 3. Force any reveal the observer missed, freeze motion at its end state,
//    return to the top, and capture.
const forced = await page.evaluate(() => {
  const left = [...document.querySelectorAll('.reveal, .hero__bg')].filter((el) => !el.classList.contains('is-in'));
  left.forEach((el) => el.classList.add('is-in'));
  const style = document.createElement('style');
  style.textContent = '*, *::before, *::after { transition-duration: 0s !important; transition-delay: 0s !important; animation: none !important; }';
  document.head.appendChild(style);
  window.scrollTo(0, 0);
  return left.length;
});
if (forced) console.warn(`NOTE: ${forced} reveal(s) had not fired on scroll and were forced.`);
await new Promise((r) => setTimeout(r, 500));
await page.screenshot({ path: outPath, fullPage: true });
await browser.close();

console.log(`Screenshot saved: ${outPath}`);
