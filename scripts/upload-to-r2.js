#!/usr/bin/env node
// Upload files under public/preview-images and public/preview-models to Cloudflare R2 using the Accounts API
// Requires env vars: CF_ACCOUNT_ID, CF_API_TOKEN, R2_BUCKET_NAME

const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');

async function walk(dir) {
  const files = [];
  for (const name of await fs.promises.readdir(dir)) {
    const full = path.join(dir, name);
    const stat = await fs.promises.stat(full);
    if (stat.isDirectory()) {
      files.push(...await walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

async function main() {
  const accountId = process.env.CF_ACCOUNT_ID;
  const apiToken = process.env.CF_API_TOKEN;
  const bucket = process.env.R2_BUCKET_NAME;

  if (!accountId || !apiToken || !bucket) {
    console.error('Missing required env vars: CF_ACCOUNT_ID, CF_API_TOKEN, R2_BUCKET_NAME');
    process.exit(1);
  }

  const baseUrl = `https://api.cloudflare.com/client/v4/accounts/${accountId}/r2/buckets/${bucket}/objects`;

  const uploadDirs = ['public/preview-images', 'public/preview-models'];

  for (const dir of uploadDirs) {
    if (!fs.existsSync(dir)) continue;
    const files = await walk(dir);
    for (const f of files) {
      const rel = path.relative('public', f).replaceAll('\\\\', '/');
      const url = `${baseUrl}/${encodeURIComponent(rel)}`;
      const body = await fs.promises.readFile(f);
      console.log(`Uploading ${rel} -> ${url}`);
      const res = await fetch(url, {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${apiToken}`,
          'Content-Type': 'application/octet-stream',
        },
        body,
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        console.error(`Failed to upload ${rel}: ${res.status} ${res.statusText}`, json);
        process.exitCode = 2;
      } else {
        console.log(`Uploaded ${rel}`);
      }
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
