// Servidor estático mínimo para testar localmente: node serve.js [porta]
const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");

const root = __dirname;
const port = Number(process.argv[2]) || 5190;
const types = { ".html": "text/html; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".css": "text/css; charset=utf-8", ".md": "text/plain; charset=utf-8", ".svg": "image/svg+xml", ".png": "image/png" };

http.createServer((req, res) => {
  let file = path.normalize(path.join(root, decodeURIComponent(new URL(req.url, "http://x").pathname)));
  if (!file.startsWith(root)) { res.writeHead(403).end(); return; }
  if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, "index.html");
  fs.readFile(file, (err, body) => {
    if (err) { res.writeHead(404).end("Não encontrado"); return; }
    res.writeHead(200, { "Content-Type": types[path.extname(file)] || "application/octet-stream" }).end(body);
  });
}).listen(port, () => console.log(`Circuito Zero em http://localhost:${port}`));
