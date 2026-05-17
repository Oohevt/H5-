#!/usr/bin/env node
import { copyFile, mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";

const root = process.cwd();
const pagesDir = path.join(root, "pages");
const dataFile = path.join(root, "data", "pages.json");
const filenamePattern = /^[a-z0-9]+(?:-[a-z0-9]+)*\.html$/;

const usage = `Usage:
  node scripts/add-page.mjs --source ./draft.html --file my-page.html --title "页面标题" --description "一句话描述" --category "AI 输出格式" --tags "H5 文档,报告"

Required:
  --source       Existing HTML file to copy into pages/
  --file         Target filename, lowercase words joined with hyphens, ending in .html
  --title        Page title
  --description  Short description
  --category     Category name

Optional:
  --tags         Comma-separated tags
  --date         YYYY-MM-DD, defaults to today
`;

const parseArgs = (argv) => {
  const args = {};
  for (let index = 0; index < argv.length; index += 1) {
    const token = argv[index];
    if (!token.startsWith("--")) continue;
    const key = token.slice(2);
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      args[key] = true;
    } else {
      args[key] = next;
      index += 1;
    }
  }
  return args;
};

const today = () => new Date().toISOString().slice(0, 10);

const readPages = async () => {
  try {
    const raw = await readFile(dataFile, "utf8");
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      throw new Error("data/pages.json must contain an array.");
    }
    return parsed;
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
};

const fail = (message) => {
  console.error(`Error: ${message}\n`);
  console.error(usage);
  process.exit(1);
};

const args = parseArgs(process.argv.slice(2));

if (args.help || args.h) {
  console.log(usage);
  process.exit(0);
}

for (const key of ["source", "file", "title", "description", "category"]) {
  if (!args[key] || typeof args[key] !== "string") {
    fail(`Missing --${key}.`);
  }
}

if (!filenamePattern.test(args.file)) {
  fail("--file must use lowercase letters, numbers, hyphens, and end with .html.");
}

const sourcePath = path.resolve(root, args.source);
const targetRelative = path.posix.join("pages", args.file);
const targetPath = path.join(pagesDir, args.file);
const date = args.date || today();
const tags = String(args.tags || "")
  .split(",")
  .map((tag) => tag.trim())
  .filter(Boolean);

const pages = await readPages();
const existing = pages.find((page) => page.file === targetRelative);

if (existing) {
  fail(`${targetRelative} already exists in data/pages.json.`);
}

await mkdir(pagesDir, { recursive: true });
await copyFile(sourcePath, targetPath);

const nextPages = [
  {
    title: args.title,
    description: args.description,
    file: targetRelative,
    category: args.category,
    tags,
    createdAt: date,
    updatedAt: date,
  },
  ...pages,
];

await writeFile(dataFile, `${JSON.stringify(nextPages, null, 2)}\n`, "utf8");

console.log(`Added ${targetRelative}`);
console.log("Next steps:");
console.log("  1. Preview locally: python3 -m http.server 8080");
console.log("  2. Open http://127.0.0.1:8080/");
console.log("  3. Commit and push:");
console.log("     git add . && git commit -m \"Add H5 page\" && git push");
