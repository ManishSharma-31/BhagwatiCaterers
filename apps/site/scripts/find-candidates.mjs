// Finds candidate photos on Wikimedia Commons (open licences only) and saves 900px thumbnails
// plus metadata to photos/candidates/. A human (or reviewer agent) then picks and vets them.
// Runs on GitHub Actions (the agent workspace cannot reach Wikimedia).
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const out = path.join(root, 'photos', 'candidates');
await mkdir(out, { recursive: true });
const UA = { 'User-Agent': 'BhagwatiCaterersSiteBuilder/1.0 (https://github.com/ManishSharma-31/BhagwatiCaterers; photo candidate search)' };
const queries = {
  'puran-poli': ['Puran poli', 'Puranpoli'],
  'bhakri-pithla': ['Pithla bhakri', 'Bhakri', 'Jowar bhakri'],
  'shrikhand': ['Shrikhand'],
  'masale-bhat': ['Masale bhat', 'Masala bhat'],
  'dal-baati-churma': ['Dal Baati Churma', 'Dal bati', 'Dal baati'],
  'rangoli': ['Rangoli Diwali', 'Rangoli flowers'],
};
const okLicence = /^(CC0|CC BY(-SA)? [0-9.]+|Public domain|PD)/i;
const meta = {};
for (const [slot, terms] of Object.entries(queries)) {
  meta[slot] = [];
  const seen = new Set();
  for (const term of terms) {
    const url = 'https://commons.wikimedia.org/w/api.php?' + new URLSearchParams({
      action: 'query', generator: 'search', gsrnamespace: '6', gsrsearch: `${term} filetype:bitmap`, gsrlimit: '12',
      prop: 'imageinfo', iiprop: 'url|extmetadata|size|mime', iiurlwidth: '900', format: 'json', origin: '*',
    });
    const res = await fetch(url, { headers: UA });
    if (!res.ok) { console.log(`search failed ${term}: ${res.status}`); continue; }
    const j = await res.json();
    for (const p of Object.values(j.query?.pages ?? {})) {
      const ii = p.imageinfo?.[0]; if (!ii || seen.has(p.title)) continue;
      const m = ii.extmetadata ?? {};
      const lic = m.LicenseShortName?.value ?? '';
      if (!okLicence.test(lic) || !/jpe?g|png/.test(ii.mime) || ii.width < 900) continue;
      seen.add(p.title);
      const n = meta[slot].length; if (n >= 6) continue;
      const file = `${slot}-${n + 1}.jpg`;
      const img = await fetch(ii.thumburl, { headers: UA });
      if (!img.ok) { console.log(`thumb failed ${p.title}: ${img.status}`); continue; }
      await writeFile(path.join(out, file), Buffer.from(await img.arrayBuffer()));
      const strip = (s) => (s ?? '').replace(/<[^>]*>/g, '').trim();
      meta[slot].push({ file, title: p.title, page: ii.descriptionurl, full: ii.url, width: ii.width, height: ii.height, licence: lic, licenceUrl: m.LicenseUrl?.value ?? '', artist: strip(m.Artist?.value), description: strip(m.ImageDescription?.value).slice(0, 200) });
    }
  }
  console.log(`${slot}: ${meta[slot].length} candidates`);
}
await writeFile(path.join(out, 'candidates.json'), JSON.stringify(meta, null, 2) + '\n');
