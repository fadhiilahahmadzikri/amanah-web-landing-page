#!/usr/bin/env node
/**
 * figma-analyze.mjs
 * Analyzes a Figma frame node and produces a structured summary JSON.
 *
 * Usage:
 *   node scripts/figma-analyze.mjs [--file-key KEY] [--node-id ID] [--token TOKEN]
 *
 * Defaults are read from .env (mcp-figma=...) and the Figma URL in the task.
 */

import path from 'node:path';
import {
  createFigmaClient,
  ensureDir,
  getFigmaToken,
  resolveFigmaSource,
  writeJsonFile,
} from './figma-tools.mjs';

const { fileKey, nodeId } = resolveFigmaSource();
const figma = createFigmaClient(getFigmaToken());
const OUT_DIR = path.resolve(process.cwd(), 'scripts', '.figma-cache');

function walkNode(node, visitor, parentPath = '') {
  const currentPath = parentPath ? `${parentPath} > ${node.name}` : node.name;
  visitor(node, currentPath);
  if (node.children) {
    for (const child of node.children) {
      walkNode(child, visitor, currentPath);
    }
  }
}

async function main() {
  ensureDir(OUT_DIR);

  console.log(`Fetching node ${nodeId} from file ${fileKey}...`);
  const nodeData = await figma.apiFetch(`/files/${fileKey}/nodes?ids=${nodeId}&geometry=paths`);
  writeJsonFile(path.join(OUT_DIR, 'node-raw.json'), nodeData);

  console.log('Fetching file image references...');
  const imagesData = await figma.apiFetch(`/files/${fileKey}/images`);
  writeJsonFile(path.join(OUT_DIR, 'images-map.json'), imagesData);

  const root = nodeData.nodes[nodeId]?.document;

  if (!root) {
    throw new Error(`Node ${nodeId} was not found in file ${fileKey}`);
  }
  const imageRefs = [];
  const vectorNodes = [];
  const textNodes = [];

  walkNode(root, (node, nodePath) => {
    // Collect image fills
    if (Array.isArray(node.fills)) {
      for (const fill of node.fills) {
        if (fill.type === 'IMAGE' && fill.imageRef) {
          imageRefs.push({
            ref: fill.imageRef,
            nodeId: node.id,
            nodeName: node.name,
            scaleMode: fill.scaleMode,
            path: nodePath,
          });
        }
      }
    }

    // Collect text
    if (node.type === 'TEXT') {
      textNodes.push({
        id: node.id,
        name: node.name,
        characters: node.characters,
        style: node.style,
        fills: node.fills,
        path: nodePath,
      });
    }

    // Collect vectors / icons
    const isVector = ['VECTOR', 'BOOLEAN_OPERATION', 'STAR', 'LINE', 'ELLIPSE'].includes(node.type);
    const nameHint = (node.name || '').toLowerCase();
    const isNamedAsset = ['icon', 'logo', 'arrow', 'svg', 'illustration'].some(k => nameHint.includes(k));
    if (isVector || isNamedAsset) {
      vectorNodes.push({
        id: node.id,
        name: node.name,
        type: node.type,
        box: node.absoluteBoundingBox,
        path: nodePath,
      });
    }
  });

  const summary = {
    frameName: root.name,
    frameSize: root.absoluteBoundingBox,
    sections: root.children.map(c => ({
      id: c.id,
      name: c.name,
      type: c.type,
      box: c.absoluteBoundingBox,
      layoutMode: c.layoutMode,
      primaryAxisAlignItems: c.primaryAxisAlignItems,
      counterAxisAlignItems: c.counterAxisAlignItems,
      padding: {
        top: c.paddingTop,
        right: c.paddingRight,
        bottom: c.paddingBottom,
        left: c.paddingLeft,
      },
      itemSpacing: c.itemSpacing,
      fills: c.fills,
      childCount: c.children?.length ?? 0,
    })),
    imageRefs,
    vectorNodes,
    textNodes,
    stats: {
      totalSections: root.children.length,
      totalImageFills: imageRefs.length,
      totalVectors: vectorNodes.length,
      totalTexts: textNodes.length,
    },
  };

  const outPath = path.join(OUT_DIR, 'frame-summary.json');
  writeJsonFile(outPath, summary);
  console.log(`\nAnalysis complete:`);
  console.log(`  Sections:    ${summary.stats.totalSections}`);
  console.log(`  Image fills: ${summary.stats.totalImageFills}`);
  console.log(`  Vectors:     ${summary.stats.totalVectors}`);
  console.log(`  Texts:       ${summary.stats.totalTexts}`);
  console.log(`  Saved to:    ${outPath}`);
}

main().catch((err) => {
  console.error('Fatal:', err.message);
  process.exit(1);
});
