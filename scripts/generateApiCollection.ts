// scripts/generateApiCollection.ts
import * as fs from "fs";
import * as path from "path";

interface Endpoint {
  method: string;
  path: string;
  module: string;
}

function readFileSync(filePath: string): string {
  return fs.readFileSync(filePath, { encoding: "utf-8" });
}

function parseRoutes(fileContent: string): { method: string; path: string }[] {
  const routeRegex =
    /router\.(get|post|put|delete|patch)\s*\(\s*['"]([^'\"]+)['"]\s*,/g;
  const routes: { method: string; path: string }[] = [];
  let match: RegExpExecArray | null;
  while ((match = routeRegex.exec(fileContent)) !== null) {
    const [, method, routePath] = match;

    if (!method || !routePath) continue;

    routes.push({
      method: method.toUpperCase(),
      path: routePath,
    });
  }
  return routes;
}

function parseMounts(appContent: string): Record<string, string> {
  const mountRegex =
    /app\.use\s*\(\s*['"]([^'\"]+)['"]\s*,\s*([a-zA-Z0-9_]+)\s*\)/g;
  const mounts: Record<string, string> = {};
  let match: RegExpExecArray | null;
  while ((match = mountRegex.exec(appContent)) !== null) {
    const [, basePath, routerVar] = match;

    if (!basePath || !routerVar) continue;

    mounts[routerVar] = basePath;
  }
  return mounts;
}

async function main() {
  const projectRoot = path.resolve(__dirname, "..", ".."); // project root
  const srcDir = path.join(projectRoot, "src");
  const appPath = path.join(srcDir, "app.ts");
  const appContent = readFileSync(appPath);
  const mounts = parseMounts(appContent);

  const modulesDir = path.join(srcDir, "modules");
  const moduleEntries = fs.readdirSync(modulesDir, { withFileTypes: true });
  const endpoints: Endpoint[] = [];

  for (const entry of moduleEntries) {
    if (!entry.isDirectory()) continue;
    const modName = entry.name;
    const modPath = path.join(modulesDir, modName);
    const routeFiles = fs
      .readdirSync(modPath)
      .filter((f) => f.endsWith(".route.ts"));
    for (const routeFile of routeFiles) {
      const fullPath = path.join(modPath, routeFile);
      const content = readFileSync(fullPath);
      const routes = parseRoutes(content);
      // Determine router variable name from import or fallback to file name
      const importMatch =
        /import\s*\{\s*([a-zA-Z0-9_]+)\s*\}\s*from\s*"\.\/([a-zA-Z0-9_]+)\.controller"/.exec(
          content,
        );
      const routerVar =
        importMatch?.[1] ?? routeFile.replace(".route.ts", "Routes");

      const mountPath = mounts[routerVar] ?? "";
      for (const r of routes) {
        const fullPath = path.posix.join(mountPath, r.path);
        endpoints.push({ method: r.method, path: fullPath, module: modName });
      }
    }
  }

  const outputPath = path.join(projectRoot, "api_collection.json");
  fs.writeFileSync(outputPath, JSON.stringify(endpoints, null, 2), {
    encoding: "utf-8",
  });
  console.log(`API collection written to ${outputPath}`);
}

main().catch((err) => {
  console.error("Failed to generate API collection:", err);
  process.exit(1);
});
