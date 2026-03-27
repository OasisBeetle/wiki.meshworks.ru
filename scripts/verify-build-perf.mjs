import { readdir, readFile, stat } from 'node:fs/promises';
import path from 'node:path';

const BUILD_DIR = path.resolve(process.cwd(), 'build');
const BANNED_HTML_SNIPPETS = [
  'family=Onest',
  'fonts.googleapis.com',
  'fonts.gstatic.com',
];
const BANNED_CSS_PATTERNS = [/href\^=['"]\/[^'"]+['"]\]::?before/g];
const IDEAL_IMAGE_PAGES = [
  path.join(BUILD_DIR, 'introduction', 'index.html'),
  path.join(BUILD_DIR, 'devices', 'index.html'),
];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const paths = await Promise.all(
    entries.map(async (entry) => {
      const target = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        return walk(target);
      }
      return [target];
    }),
  );

  return paths.flat();
}

async function readHtmlFiles(dir) {
  const files = await walk(dir);
  const htmlFiles = files.filter((file) => file.endsWith('.html'));

  return Promise.all(
    htmlFiles.map(async (file) => ({
      file,
      html: await readFile(file, 'utf8'),
    })),
  );
}

async function readCssFiles(dir) {
  const files = await walk(dir);
  const cssFiles = files.filter((file) => file.endsWith('.css'));

  return Promise.all(
    cssFiles.map(async (file) => ({
      file,
      css: await readFile(file, 'utf8'),
      size: (await stat(file)).size,
    })),
  );
}

async function main() {
  const buildStats = await stat(BUILD_DIR);
  if (!buildStats.isDirectory()) {
    throw new Error(`build directory not found at ${BUILD_DIR}`);
  }

  const htmlFiles = await readHtmlFiles(BUILD_DIR);
  const cssFiles = await readCssFiles(BUILD_DIR);
  const missingSnippets = [];
  const cssProblems = [];

  for (const snippet of BANNED_HTML_SNIPPETS) {
    const found = htmlFiles.find(({ html }) => html.includes(snippet));
    if (found) {
      missingSnippets.push(`unexpected "${snippet}" in ${path.relative(BUILD_DIR, found.file)}`);
    }
  }

  for (const pattern of BANNED_CSS_PATTERNS) {
    const found = cssFiles.find(({ css }) => pattern.test(css));
    if (found) {
      cssProblems.push(
        `unexpected CSS route-mapping selector in ${path.relative(BUILD_DIR, found.file)}`,
      );
    }
  }

  const idealImageChecks = await Promise.all(
    IDEAL_IMAGE_PAGES.map(async (file) => ({
      file,
      html: await readFile(file, 'utf8'),
    })),
  );

  const pagesWithoutIdealImage = idealImageChecks
    .filter(({ html }) => !html.includes('ideal-img'))
    .map(({ file }) => path.relative(BUILD_DIR, file));

  if (missingSnippets.length > 0 || cssProblems.length > 0 || pagesWithoutIdealImage.length > 0) {
    const problems = [
      ...missingSnippets,
      ...cssProblems,
      ...pagesWithoutIdealImage.map((file) => `missing ideal-img markup in ${file}`),
    ];
    throw new Error(`verify-build-perf failed:\n- ${problems.join('\n- ')}`);
  }

  const totalCssBytes = cssFiles.reduce((sum, file) => sum + file.size, 0);
  process.stdout.write(`verify-build-perf: shared-css=${(totalCssBytes / 1024).toFixed(1)} KiB\n`);
  process.stdout.write('verify-build-perf: ok\n');
}

main().catch((error) => {
  process.stderr.write(`${error instanceof Error ? error.message : String(error)}\n`);
  process.exitCode = 1;
});
