import { promises as fs } from "node:fs";
import path from "node:path";

async function pathExists(candidatePath) {
  try {
    await fs.access(candidatePath);
    return true;
  } catch {
    return false;
  }
}

async function* walkFiles(rootDir) {
  const entries = await fs.readdir(rootDir, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(rootDir, entry.name);
    if (entry.isDirectory()) {
      yield* walkFiles(entryPath);
      continue;
    }
    if (entry.isFile()) yield entryPath;
  }
}

function withoutHtmlExtension(filePath) {
  if (!filePath.toLowerCase().endsWith(".html")) return null;
  return filePath.slice(0, -".html".length);
}

async function ensureIndexHtmlForHtmlPages(buildDir) {
  if (!(await pathExists(buildDir))) {
    throw new Error(`Build directory not found: ${buildDir}`);
  }

  const created = [];

  for await (const filePath of walkFiles(buildDir)) {
    const basePath = withoutHtmlExtension(filePath);
    if (!basePath) continue;

    const siblingDir = basePath;
    const siblingIndex = path.join(siblingDir, "index.html");

    let stat;
    try {
      stat = await fs.stat(siblingDir);
    } catch {
      continue;
    }

    if (!stat.isDirectory()) continue;
    if (await pathExists(siblingIndex)) continue;

    await fs.copyFile(filePath, siblingIndex);
    created.push(path.relative(buildDir, siblingIndex));
  }

  return created;
}

async function main() {
  const buildDir = path.resolve(process.cwd(), "build");
  const created = await ensureIndexHtmlForHtmlPages(buildDir);

  if (created.length === 0) {
    process.stdout.write("postbuild-add-indexes: no changes\n");
    return;
  }

  process.stdout.write(
    `postbuild-add-indexes: created ${created.length} index.html file(s)\n`,
  );
  for (const rel of created) process.stdout.write(`- ${rel}\n`);
}

main().catch((error) => {
  process.stderr.write(
    `postbuild-add-indexes: failed: ${
      error instanceof Error ? error.message : String(error)
    }\n`,
  );
  process.exitCode = 1;
});

