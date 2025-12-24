#!/usr/bin/env node
import fs from "fs";
import path from "path";
import JSZip from "jszip";

const BASE = "https://pub-5028263d95314adf96c555f4bbb022f0.r2.dev/button";
const files = [
  "Pin.stl",
  "h160-w67-hook.stl",
  "h160-w67-sa.stl",
  "h160-w67-sb.stl",
];

async function fetchArrayBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} - ${url}`);
  return await res.arrayBuffer();
}

async function run() {
  const zip = new JSZip();
  for (const fname of files) {
    const url = `${BASE}/${fname}`;
    try {
      const buf = await fetchArrayBuffer(url);
      zip.file(fname, Buffer.from(buf));
      console.log("Fetched:", url);
    } catch (err) {
      console.error("Failed:", url, err.message);
      process.exitCode = 1;
      return;
    }
  }
  const content = await zip.generateAsync({ type: "nodebuffer" });
  const out = path.resolve(process.cwd(), "simulated-download-button.zip");
  fs.writeFileSync(out, content);
  console.log("Wrote:", out);
}

run().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
