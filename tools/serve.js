/* ==========================================================================
   serve.js — zero-dependency local preview server
   --------------------------------------------------------------------------
   Run:  node tools/serve.js          (then open http://localhost:8080)
         node tools/serve.js 3000     (to use a different port)

   Why this exists: the site uses root-relative paths (/css/style.css), so
   opening index.html straight from the filesystem breaks every link, image
   and stylesheet. This serves the folder over http so paths resolve exactly
   as they will in production — including a real 404 status for unknown URLs.
   ========================================================================== */

'use strict';

const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const PORT = Number(process.argv[2]) || 8080;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.webmanifest': 'application/manifest+json; charset=utf-8',
  '.xml': 'application/xml; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp'
};

const server = http.createServer((req, res) => {
  let urlPath = decodeURIComponent(req.url.split('?')[0]);
  if (urlPath.endsWith('/')) urlPath += 'index.html';

  const filePath = path.join(ROOT, urlPath);

  /* Refuse anything that escapes the project folder */
  const isInside = filePath.startsWith(ROOT + path.sep) || filePath === path.join(ROOT, 'index.html');

  if (!isInside || !fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    /* Serve the real 404 page with a real 404 status, the way the
       production server should be configured to. */
    const notFound = path.join(ROOT, '404.html');
    res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
    res.end(fs.existsSync(notFound) ? fs.readFileSync(notFound) : 'Not found');
    console.log(`  404  ${urlPath}`);
    return;
  }

  res.writeHead(200, {
    'Content-Type': MIME[path.extname(filePath).toLowerCase()] || 'application/octet-stream',
    'Cache-Control': 'no-cache'
  });
  fs.createReadStream(filePath).pipe(res);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n  Port ${PORT} is already in use.`);
    console.error(`  Try another one:  node tools/serve.js ${PORT + 1}\n`);
    process.exit(1);
  }
  throw err;
});

server.listen(PORT, () => {
  console.log(`\n  Mayra Russian Spa — local preview`);
  console.log(`  ${'-'.repeat(38)}`);
  console.log(`  http://localhost:${PORT}\n`);
  console.log(`  Press Ctrl+C to stop.\n`);
});
