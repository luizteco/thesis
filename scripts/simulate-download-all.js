#!/usr/bin/env node
import fs from "fs";
import path from "path";
import toml from "toml";
import JSZip from "jszip";

// Read devices.toml and simulate downloads for each device entry (uses patterns defined there)
const DEVICES_TOML = path.resolve(process.cwd(), "public/devices.toml");

function parseTomlFile(filePath) {
  const txt = fs.readFileSync(filePath, "utf-8");
  return toml.parse(txt).device;
}

function formatFromPattern(pattern, dims, replacements = {}) {
  return pattern
    .replace(/{w}/g, (dims.width ?? 0).toString())
    .replace(/{h}/g, (dims.height ?? 0).toString())
    .replace(/{d}/g, (dims.depth ?? 0).toString())
    .replace(/{t}/g, (dims.thickness ?? dims.depth ?? 0).toString())
    .replace(/{id}/g, replacements.id ?? "")
    .replace(/{part}/g, replacements.part ?? "");
}

async function fetchArrayBuffer(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} - ${url}`);
  return await res.arrayBuffer();
}

async function simulateDevice(device, dims) {
  // Allow per-device sample dimensions (defined in devices.toml as sampleDims)
  const defaultDimsByType = {
    button: { width: 67, height: 160, depth: 20, thickness: 22 },
    cup: { width: 80, height: 160, depth: 80, thickness: 22 },
    cutlery: { width: 40, height: 197, depth: 30, thickness: 28 },
    bidet: { width: 200, height: 200, depth: 200, thickness: 40 },
  };

  const prefix = device.prefixUrl ?? "https://pub-5028263d95314adf96c555f4bbb022f0.r2.dev";
  dims = dims ?? (device.sampleDims ? device.sampleDims : (device.productType && defaultDimsByType[device.productType] ? defaultDimsByType[device.productType] : { width: 160, height: 160, depth: 30, thickness: 22 }));
  const files = [];

  // static
  if (device.staticFiles) files.push(...device.staticFiles);

  // variableParts
  if (device.variablePattern && device.variableParts) {
    for (const p of device.variableParts) {
      files.push(formatFromPattern(device.variablePattern, dims, { part: p }));
    }
  } else if (device.variablePattern && !device.variableParts) {
    // Only add a single variable file when the pattern does not expect a {part} placeholder
    if (!device.variablePattern.includes("{part}")) {
      files.push(formatFromPattern(device.variablePattern, dims));
    }
  }

  // cutlery handle logic
  if (device.handleYesParts || device.handleNoParts) {
    const parts = device.handleYesParts ?? device.handleNoParts ?? [];
    for (const part of parts) {
      if (part === "handle" && device.handlePattern) files.push(formatFromPattern(device.handlePattern, dims, { part }));
      else if (device.variablePattern) files.push(formatFromPattern(device.variablePattern, dims, { part }));
      else files.push(`${part}.stl`);
    }
  }

  const zip = new JSZip();
  for (const f of files) {
    const url = `${prefix}/${device.id}/${f}`;
    try {
      const buf = await fetchArrayBuffer(url);
      zip.file(f, Buffer.from(buf));
      console.log(`Fetched: ${url}`);
    } catch (err) {
      console.error(`Failed: ${url}`, err.message);
      throw err;
    }
  }

  const content = await zip.generateAsync({ type: "nodebuffer" });
  const out = path.resolve(process.cwd(), `simulated-download-${device.id}.zip`);
  fs.writeFileSync(out, content);
  console.log(`Wrote: ${out}`);
}

async function main() {
  const devices = parseTomlFile(DEVICES_TOML);
  for (const d of devices) {
    try {
      console.log(`\n--- Simulating ${d.id} ---`);
      await simulateDevice(d);
    } catch (err) {
      console.error(`Simulation failed for ${d.id}:`, err.message);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exitCode = 1;
});
