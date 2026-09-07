// build.js — collects deployable files into ./dist for Amplify
const fs = require("fs");
const path = require("path");

const DIST = path.join(__dirname, "dist");
const VENDOR = path.join(DIST, "vendor");

// Start fresh so stale files never linger in the artifact
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(VENDOR, { recursive: true });

// 1. Copy your own site files (everything in the project root except build junk)
for (const entry of fs.readdirSync(__dirname, { withFileTypes: true })) {
  if (["dist", "node_modules", "build.js", "package.json", "package-lock.json"].includes(entry.name)) {
    continue;
  }
  fs.cpSync(path.join(__dirname, entry.name), path.join(DIST, entry.name), { recursive: true });
}

// 2. Vendor only the libraries the site actually references
const vendorMap = {
  "node_modules/bootstrap/dist": "vendor/bootstrap",
  "node_modules/@fortawesome/fontawesome-free": "vendor/fontawesome-free",
};

for (const [src, dest] of Object.entries(vendorMap)) {
  fs.cpSync(path.join(__dirname, src), path.join(DIST, dest), { recursive: true });
}

// 3. Rewrite node_modules/... references in HTML files to vendor/...
function rewriteHtml(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      rewriteHtml(full);
    } else if (entry.name.endsWith(".html")) {
      let html = fs.readFileSync(full, "utf8");
      html = html
        .replaceAll("node_modules/bootstrap/dist", "vendor/bootstrap")
        .replaceAll("node_modules/@fortawesome/fontawesome-free", "vendor/fontawesome-free");
      fs.writeFileSync(full, html);
    }
  }
}
rewriteHtml(DIST);

console.log("Build complete: dist/ ready for deployment.");
