#!/usr/bin/env node
/**
 * figma-download.mjs
 * Downloads assets from a Figma frame: image fills, vector/icon SVGs, and section preview PNGs.
 *
 * Prerequisite: Run figma-analyze.mjs first to produce scripts/.figma-cache/frame-summary.json
 *
 * Usage:
 *   node scripts/figma-download.mjs
 */

import fs from 'node:fs';
import path from 'node:path';
import {
  createFigmaClient,
  downloadBuffer,
  ensureDir,
  getFigmaToken,
  readJsonFile,
  resolveFigmaSource,
  safeAssetName,
} from './figma-tools.mjs';

const { fileKey, nodeId } = resolveFigmaSource();
const figma = createFigmaClient(getFigmaToken());
const CACHE_DIR = path.resolve(process.cwd(), 'scripts', '.figma-cache');
const ASSETS_DIR = path.resolve(process.cwd(), 'public', 'assets');

async function downloadImageFills(summary, imagesMap) {
  const fills = summary.imageRefs || [];
  if (fills.length === 0) {
    console.log('No image fills to download.');
    return;
  }

  const imgDir = path.join(ASSETS_DIR, 'images');
  ensureDir(imgDir);

  const seen = new Set();
  let count = 0;

  for (const item of fills) {
    if (seen.has(item.ref)) {
      continue;
    }
    seen.add(item.ref);

    const url = imagesMap[item.ref];
    if (!url) {
      continue;
    }

    try {
      const buf = await downloadBuffer(url);
      const filename = `${safeAssetName(item.nodeName)}_${item.ref.substring(0, 8)}.png`;
      fs.writeFileSync(path.join(imgDir, filename), buf);
      count++;
      process.stdout.write(`\r  Image fills: ${count}/${seen.size}`);
    } catch (err) {
      console.error(`\n  Failed ${item.ref}: ${err.message}`);
    }
  }
  console.log(`\n  Downloaded ${count} unique image fills to public/assets/images/`);
}

async function downloadVectorSVGs(summary) {
  const vectors = summary.vectorNodes || [];
  if (vectors.length === 0) {
    console.log('No vector nodes to export.');
    return;
  }

  const svgDir = path.join(ASSETS_DIR, 'svg');
  ensureDir(svgDir);

  const uniqueIds = [...new Set(vectors.map(v => v.id))];
  let count = 0;

  for (let i = 0; i < uniqueIds.length; i += 30) {
    const batch = uniqueIds.slice(i, i + 30);
    const idsParam = batch.join(',');

    try {
      const data = await figma.apiFetch(`/images/${fileKey}?ids=${idsParam}&format=svg`);
      if (!data.images) {
        continue;
      }

      for (const [id, svgUrl] of Object.entries(data.images)) {
        if (!svgUrl) {
          continue;
        }
        try {
          const res = await fetch(svgUrl);
          const svgContent = await res.text();
          const vObj = vectors.find(v => v.id === id);
          const filename = `${safeAssetName(vObj?.name)}_${id.replace(/:/g, '_')}.svg`;
          fs.writeFileSync(path.join(svgDir, filename), svgContent);
          count++;
          process.stdout.write(`\r  SVGs: ${count}/${uniqueIds.length}`);
        } catch (err) {
          console.error(`\n  Failed SVG ${id}: ${err.message}`);
        }
      }
    } catch (err) {
      console.error(`\n  Batch export error: ${err.message}`);
    }
  }
  console.log(`\n  Exported ${count} SVG assets to public/assets/svg/`);
}

async function downloadSectionPreviews(summary) {
  const sections = summary.sections || [];
  if (sections.length === 0) {
    console.log('No sections to preview.');
    return;
  }

  const previewDir = path.join(ASSETS_DIR, 'previews');
  ensureDir(previewDir);

  const sectionIds = sections.map(s => s.id).join(',');
  const data = await figma.apiFetch(`/images/${fileKey}?ids=${sectionIds}&scale=2&format=png`);

  let count = 0;
  if (data.images) {
    for (const [id, pngUrl] of Object.entries(data.images)) {
      if (!pngUrl) {
        continue;
      }
      try {
        const buf = await downloadBuffer(pngUrl);
        const section = sections.find(s => s.id === id);
        const filename = `section_${safeAssetName(section?.name)}_${id.replace(/:/g, '_')}.png`;
        fs.writeFileSync(path.join(previewDir, filename), buf);
        count++;
        process.stdout.write(`\r  Sections: ${count}/${sections.length}`);
      } catch (err) {
        console.error(`\n  Failed section ${id}: ${err.message}`);
      }
    }
  }
  console.log(`\n  Saved ${count} section previews to public/assets/previews/`);
}

async function downloadFramePreview() {
  const previewDir = path.join(ASSETS_DIR, 'previews');
  ensureDir(previewDir);

  console.log('  Exporting full frame preview...');
  const data = await figma.apiFetch(`/images/${fileKey}?ids=${nodeId}&scale=2&format=png`);
  const url = data.images?.[nodeId];
  if (!url) {
    console.log('  No URL returned for frame preview.');
    return;
  }

  const buf = await downloadBuffer(url);
  const outPath = path.join(previewDir, 'full-frame-preview.png');
  fs.writeFileSync(outPath, buf);
  console.log(`  Full frame preview: ${outPath} (${(buf.length / 1024 / 1024).toFixed(1)} MB)`);
}

async function main() {
  const summaryPath = path.join(CACHE_DIR, 'frame-summary.json');
  if (!fs.existsSync(summaryPath)) {
    console.error('frame-summary.json not found. Run figma-analyze.mjs first.');
    process.exit(1);
  }

  const imagesMapPath = path.join(CACHE_DIR, 'images-map.json');
  if (!fs.existsSync(imagesMapPath)) {
    console.error('images-map.json not found. Run figma-analyze.mjs first.');
    process.exit(1);
  }

  const summary = readJsonFile(summaryPath);
  const imagesRaw = readJsonFile(imagesMapPath);
  const imagesMap = imagesRaw.meta?.images || {};

  ensureDir(ASSETS_DIR);

  // Clean previous generic fill downloads
  const oldFills = fs.readdirSync(ASSETS_DIR).filter(f => f.startsWith('fill-'));
  for (const f of oldFills) {
    fs.unlinkSync(path.join(ASSETS_DIR, f));
  }
  if (oldFills.length > 0) {
    console.log(`Cleaned ${oldFills.length} old generic fill files.`);
  }

  console.log('\n=== Downloading Figma Assets ===\n');

  console.log('[1/4] Full frame preview...');
  await downloadFramePreview();

  console.log('\n[2/4] Section previews...');
  await downloadSectionPreviews(summary);

  console.log('\n[3/4] Image fills...');
  await downloadImageFills(summary, imagesMap);

  console.log('\n[4/4] Vector/Icon SVGs...');
  await downloadVectorSVGs(summary);

  console.log('\n=== All downloads complete ===');
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
