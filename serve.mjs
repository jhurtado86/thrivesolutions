import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

/*
  Local static server with clean-URL parity to vercel.json
  (cleanUrls: true, trailingSlash: true):
    /            -> index.html
    /about/      -> about/index.html
    /about       -> 301 -> /about/
    /page        -> page.html (if such a file exists)
  Run: node serve.mjs   (PORT env overrides 3000)
*/

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.json': 'application/json',
  '.xml':  'application/xml',
  '.txt':  'text/plain; charset=utf-8',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.woff2':'font/woff2',
  '.woff': 'font/woff',
  '.mp4':  'video/mp4',
  '.webm': 'video/webm',
  '.ogg':  'video/ogg',
};

function resolvePath(urlPath) {
  let pathname;
  try { pathname = decodeURIComponent(new URL(urlPath, 'http://localhost').pathname); }
  catch { return { status: 400 }; }

  const abs = path.normalize(path.join(__dirname, pathname));
  if (!abs.startsWith(__dirname)) return { status: 403 };

  if (pathname.endsWith('/')) {
    const index = path.join(abs, 'index.html');
    return fs.existsSync(index) ? { status: 200, file: index } : { status: 404 };
  }

  if (!path.extname(pathname)) {
    if (fs.existsSync(abs) && fs.statSync(abs).isDirectory()) return { status: 301, location: pathname + '/' };
    if (fs.existsSync(abs + '.html')) return { status: 200, file: abs + '.html' };
    return { status: 404 };
  }

  return fs.existsSync(abs) && fs.statSync(abs).isFile() ? { status: 200, file: abs } : { status: 404 };
}

http.createServer((req, res) => {
  const r = resolvePath(req.url);

  if (r.status === 301) {
    res.writeHead(301, { Location: r.location });
    res.end();
    return;
  }
  if (r.status !== 200) {
    res.writeHead(r.status, { 'Content-Type': 'text/plain' });
    res.end(r.status === 404 ? 'Not found' : 'Bad request');
    return;
  }

  const filePath = r.file;
  const ext = path.extname(filePath).toLowerCase();
  const contentType = MIME[ext] || 'application/octet-stream';
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const rangeHeader = req.headers['range'];

  if (rangeHeader) {
    const parts = rangeHeader.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
    const chunkSize = end - start + 1;
    res.writeHead(206, {
      'Content-Range':  `bytes ${start}-${end}/${fileSize}`,
      'Accept-Ranges':  'bytes',
      'Content-Length': chunkSize,
      'Content-Type':   contentType,
    });
    fs.createReadStream(filePath, { start, end }).pipe(res);
  } else {
    res.writeHead(200, {
      'Content-Length': fileSize,
      'Content-Type':   contentType,
      'Accept-Ranges':  'bytes',
      'Cache-Control':  'no-cache',
    });
    fs.createReadStream(filePath).pipe(res);
  }
}).listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
