import { Buffer } from 'node:buffer';
import fs from 'node:fs';
import path from 'node:path';

const API_BASE = 'https://api.figma.com/v1';
const DEFAULT_FILE_KEY = '0YfqGRnBCgiU4lXK64Bp3n';
const DEFAULT_NODE_ID = '2049:4894';
const ENV_FILES = ['.env.local', '.env'];
const TOKEN_KEYS = ['FIGMA_TOKEN', 'MCP_FIGMA_TOKEN', 'mcp-figma'];

export function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

export function readJsonFile(filePath) {
  return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
}

export function writeJsonFile(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
}

export function safeAssetName(value) {
  return (value || 'unknown').replace(/[^\w-]/g, '_').substring(0, 60);
}

export async function downloadBuffer(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Download failed ${response.status}: ${url}`);
  }

  return Buffer.from(await response.arrayBuffer());
}

export function createFigmaClient(token) {
  return {
    async apiFetch(endpoint) {
      const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: { 'X-Figma-Token': token },
      });

      if (!response.ok) {
        const body = await response.text();
        throw new Error(`Figma API ${response.status}: ${body}`);
      }

      return response.json();
    },
  };
}

export function getFigmaToken() {
  for (const key of TOKEN_KEYS) {
    if (process.env[key]) {
      return process.env[key];
    }
  }

  const envVariables = readLocalEnvFiles();

  for (const key of TOKEN_KEYS) {
    if (envVariables.has(key)) {
      return envVariables.get(key);
    }
  }

  throw new Error('No Figma token found. Set FIGMA_TOKEN, MCP_FIGMA_TOKEN, or mcp-figma in .env.local/.env');
}

export function resolveFigmaSource() {
  const cliUrl = getCliOption('--url');
  const parsedUrl = parseFigmaDesignUrl(cliUrl || process.env.FIGMA_URL || '');

  return {
    fileKey: getCliOption('--file-key') || process.env.FIGMA_FILE_KEY || parsedUrl.fileKey || DEFAULT_FILE_KEY,
    nodeId: getCliOption('--node-id') || process.env.FIGMA_NODE_ID || parsedUrl.nodeId || DEFAULT_NODE_ID,
  };
}

function readLocalEnvFiles() {
  const variables = new Map();

  for (const envFile of ENV_FILES) {
    const envPath = path.resolve(process.cwd(), envFile);

    if (!fs.existsSync(envPath)) {
      continue;
    }

    const content = fs.readFileSync(envPath, 'utf-8');
    const fileVariables = parseEnvContent(content);

    for (const [key, value] of fileVariables) {
      variables.set(key, value);
    }
  }

  return variables;
}

function parseEnvContent(content) {
  const variables = new Map();

  for (const line of content.split(/\r?\n/)) {
    const trimmedLine = line.trim();

    if (!trimmedLine || trimmedLine.startsWith('#')) {
      continue;
    }

    const separatorIndex = trimmedLine.indexOf('=');

    if (separatorIndex <= 0) {
      continue;
    }

    const key = trimmedLine.slice(0, separatorIndex).trim();

    if (!isEnvKey(key)) {
      continue;
    }

    const value = stripEnvQuotes(trimmedLine.slice(separatorIndex + 1));
    variables.set(key, value);
  }

  return variables;
}

function isEnvKey(value) {
  const [firstCharacter] = value;

  if (!firstCharacter || !isAlphaOrUnderscore(firstCharacter)) {
    return false;
  }

  return [...value.slice(1)].every(isEnvKeyCharacter);
}

function isAlphaOrUnderscore(value) {
  const lowerCaseValue = value.toLowerCase();

  return lowerCaseValue === '_' || (lowerCaseValue >= 'a' && lowerCaseValue <= 'z');
}

function isEnvKeyCharacter(value) {
  return isAlphaOrUnderscore(value) || value === '-' || (value >= '0' && value <= '9');
}

function stripEnvQuotes(value) {
  const trimmedValue = value.trim();
  const quote = trimmedValue[0];

  if ((quote === '"' || quote === '\'') && trimmedValue.endsWith(quote)) {
    return trimmedValue.slice(1, -1);
  }

  return trimmedValue;
}

function parseFigmaDesignUrl(value) {
  if (!value) {
    return {};
  }

  try {
    const figmaUrl = new URL(value);
    const [, fileType, fileKey] = figmaUrl.pathname.split('/');

    if (fileType !== 'design' && fileType !== 'file') {
      return {};
    }

    const rawNodeId = figmaUrl.searchParams.get('node-id') || '';

    return {
      fileKey,
      nodeId: rawNodeId.replace('-', ':'),
    };
  } catch {
    return {};
  }
}

function getCliOption(name) {
  const index = process.argv.indexOf(name);

  if (index === -1) {
    return '';
  }

  return process.argv[index + 1] || '';
}
