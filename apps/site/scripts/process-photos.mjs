// Downloads the licence-checked stock photos listed in photos/manifest.json and
// writes optimised copies into public/photos/ (webp 800 + 1600, jpg 800).
// Runs on GitHub Actions (see .github/workflows/photos.yml) because the agent workspace has no access to photo sites.
//
// Usage: npm run photos
// Skips entries with needs_manual=true, a missing direct_url, or faces_or_logos=true.
import { mkdir, readFile, writeFile, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const manifestPath = path.join(root, 'photos', 'manifest.json');
const rawDir = path.join(root, 'photos', 'raw');
const outDir = path.join(root, 'public', 'photos');

const exists = async (p) => !!(await stat(p).catch(() => null));
const slugOf = (fileName) => fileName.replace(/\.[a-z0-9]+$/i, '');

const manifest = JSON.parse(await readFile(manifestPath, 'utf8'));
await mkdir(rawDir, { recursive: true });
await mkdir(outDir, { recursive: true });

const report = { done: [], skipped: [], failed: [] };

for (const item of manifest) {
  const slug = slugOf(item.file_name);
  if (item.needs_manual || !item.direct_url) { report.skipped.push({ slug, why: 'needs manual download or no direct_url' }); continue; }
  if (item.faces_or_logos) { report.skipped.push({ slug, why: 'flagged faces_or_logos' }); continue; }
  try {
    const rawPath = path.join(rawDir, item.file_name);
    if (!(await exists(rawPath))) {
      const res = await fetch(item.direct_url, { headers: { 'User-Agent': 'BhagwatiCaterersSiteBuilder/1.0 (+https://github.com/ManishSharma-31/BhagwatiCaterers)' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const type = res.headers.get('content-type') || '';
      if (!type.startsWith('image/')) throw new Error(`not an image (${type})`);
      await writeFile(rawPath, Buffer.from(await res.arrayBuffer()));
    }
    const img = sharp(rawPath).rotate().withMetadata({ exif: {} }); // strip EXIF (location etc.)
    const meta = await sharp(rawPath).metadata();
    if ((meta.width || 0) < 800) throw new Error(`too small (${meta.width}px)`);
    await img.clone().resize({ width: 1600, withoutEnlargement: true }).webp({ quality: 74 }).toFile(path.join(outDir, `${slug}-1600.webp`));
    await img.clone().resize({ width: 800, withoutEnlargement: true }).webp({ quality: 76 }).toFile(path.join(outDir, `${slug}-800.webp`));
    await img.clone().resize({ width: 800, withoutEnlargement: true }).jpeg({ quality: 78, mozjpeg: true }).toFile(path.join(outDir, `${slug}-800.jpg`));
    report.done.push({ slug, source: item.source, page_url: item.page_url, photographer: item.photographer, license: item.license, width: meta.width, height: meta.height });
  } catch (e) {
    report.failed.push({ slug, why: String(e.message || e) });
  }
}

await writeFile(path.join(root, 'photos', 'processed.json'), JSON.stringify(report, null, 2) + '\n');
console.log(`photos: ${report.done.length} done, ${report.skipped.length} skipped, ${report.failed.length} failed`);
for (const f of report.failed) console.log(`  FAILED ${f.slug}: ${f.why}`);
for (const s of report.skipped) console.log(`  skipped ${s.slug}: ${s.why}`);
