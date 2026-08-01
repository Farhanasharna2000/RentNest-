// scripts/generateApiCollection.js
const fs = require('fs');
const path = require('path');

/**
 * Simple Postman collection generator for Express routes.
 * Generates a collection with items for each endpoint (method, path).
 */
function readFileSync(filePath) {
  return fs.readFileSync(filePath, { encoding: 'utf-8' });
}

function parseRoutes(fileContent) {
  const routeRegex = /router\.(get|post|put|delete|patch)\s*\(\s*['\"]([^'\"]+)['\"]\s*,/g;
  const routes = [];
  let match;
  while ((match = routeRegex.exec(fileContent)) !== null) {
    routes.push({ method: match[1].toUpperCase(), path: match[2] });
  }
  return routes;
}

function parseMounts(appContent) {
  const mountRegex = /app\.use\s*\(\s*['\"]([^'\"]+)['\"]\s*,\s*([a-zA-Z0-9_]+)\s*\)/g;
  const mounts = {};
  let match;
  while ((match = mountRegex.exec(appContent)) !== null) {
    const basePath = match[1];
    const routerVar = match[2];
    mounts[routerVar] = basePath;
  }
  return mounts;
}

function buildPostmanCollection(endpoints) {
  const collection = {
    info: {
      name: 'Project API Collection',
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    item: endpoints.map((ep) => ({
      name: `${ep.method} ${ep.path}`,
      request: {
        method: ep.method,
        header: [],
        url: {
          raw: `{{baseUrl}}${ep.path}`,
          host: ['{{baseUrl}}'],
          path: ep.path.split('/').filter(Boolean),
        },
        body: {
          mode: 'raw',
          raw: '{}',
        },
      },
    })),
  };
  return collection;
}

async function main() {
  const projectRoot = path.resolve(__dirname, '..');
  const srcDir = path.join(projectRoot, 'src');
  const appPath = path.join(srcDir, 'app.ts');
  const appContent = readFileSync(appPath);
  const mounts = parseMounts(appContent);

  const modulesDir = path.join(srcDir, 'modules');
  const moduleDirs = fs.readdirSync(modulesDir, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const endpoints = [];
  for (const mod of moduleDirs) {
    const modPath = path.join(modulesDir, mod);
    const routeFiles = fs.readdirSync(modPath).filter((f) => f.endsWith('.route.ts'));
    for (const rf of routeFiles) {
      const content = readFileSync(path.join(modPath, rf));
      const routes = parseRoutes(content);
      // infer router variable name from import or filename
      const importMatch = /import\s*\{\s*([a-zA-Z0-9_]+)\s*\}\s*from\s*"\.\/([a-zA-Z0-9_]+)\.controller"/.exec(content);
      const routerVar = importMatch ? importMatch[1] : rf.replace('.route.ts', 'Routes');
      const mountPath = mounts[routerVar] || '';
      for (const r of routes) {
        const fullPath = path.posix.join(mountPath, r.path);
        endpoints.push({ method: r.method, path: fullPath, module: mod });
      }
    }
  }

  const collection = buildPostmanCollection(endpoints);
  const outPath = path.join(projectRoot, 'api_collection.json');
  fs.writeFileSync(outPath, JSON.stringify(collection, null, 2), { encoding: 'utf-8' });
  console.log('Postman collection written to', outPath);
}

main().catch((err) => {
  console.error('Error generating collection:', err);
  process.exit(1);
});
