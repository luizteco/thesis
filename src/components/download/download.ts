import type { Dimensions, ObjectName } from "../object/object";
import { INSTRUCTIONS_FILE, PREFIX_URL } from "./download.config";
import { packageZip } from "./zip";

type DeviceDownloadConfig = {
  productType?: string;
  staticFiles?: string[]; // exact filenames (with extension) stored under device folder
  variablePattern?: string; // pattern with placeholders including {part}
  variableParts?: string[]; // list of parts to substitute into {part}
  prefixUrl?: string; // optional override
  includeInstructions?: boolean;
  // For cutlery: parts when handle chosen vs not
  handleYesParts?: string[];
  handleNoParts?: string[];
  // optional pattern to use specifically for the handle part (if different)
  handlePattern?: string;
  // optional size table to map known heights to widths/thicknesses
  sizeTable?: Array<{
    h: number;
    widths?: { narrow?: number; med?: number; wide?: number };
    thickness?: { narrow?: number; med?: number; wide?: number };
  }>;
};

function formatFromPattern(pattern: string, objectName: ObjectName, dimensions: Dimensions, replacements: Record<string, string | number | undefined> = {}) {
  return pattern
    .replace(/{w}/g, (dimensions.width ?? 0).toString())
    .replace(/{h}/g, (dimensions.height ?? 0).toString())
    .replace(/{d}/g, (dimensions.depth ?? 0).toString())
    .replace(/{t}/g, ((dimensions as any).thickness ?? dimensions.depth ?? 0).toString())
    .replace(/{id}/g, objectName)
    .replace(/{part}/g, (replacements.part ?? "").toString());
}

function joinPath(prefix: string, objectName: string, filename: string) {
  // If filename already contains a slash, treat it as an absolute path (relative to prefix)
  const filePath = filename.includes("/") ? filename : `${objectName}/${filename}`;
  return `${prefix}/${filePath}`;
}

async function existsUrl(url: string): Promise<boolean> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.ok;
  } catch (err) {
    // network error or CORS will cause fetch to throw
    return false;
  }
}
function generateOffsets(maxOffset = 10) {
  // produce [0,1,-1,2,-2,3,-3,...] up to maxOffset
  const res: number[] = [0];
  for (let i = 1; i <= maxOffset; i++) {
    res.push(i, -i);
  }
  return res;
}

async function findClosestFile(
  prefix: string,
  objectName: string,
  pattern: string,
  dims: any,
  part?: string,
  maxOffset = 10,
  sizeTable?: DeviceDownloadConfig["sizeTable"]
): Promise<string | null> {
  // Decide which placeholders the pattern contains and generate candidates accordingly.
  const hasH = pattern.includes("{h}");
  const hasW = pattern.includes("{w}");
  const hasT = pattern.includes("{t}");
  // whether pattern uses {part} or a part was supplied

  let hCandidates: (number | undefined)[] = [undefined];
  if (hasH) {
    if (sizeTable && sizeTable.length) {
      // use heights from sizeTable ordered by closeness to requested height
      hCandidates = [...sizeTable]
        .sort((a, b) => Math.abs((a.h ?? 0) - (dims.height ?? 0)) - Math.abs((b.h ?? 0) - (dims.height ?? 0)))
        .map((r) => r.h);
    } else {
      hCandidates = generateOffsets(Math.min(maxOffset, 20)).map((off) => dims.height + off);
    }
  }
  const wOffsets = hasW ? generateOffsets(Math.min(maxOffset, 20)) : [0];
  const tOffsets = hasT ? generateOffsets(Math.min(maxOffset, 20)) : [0];

  // Build a list of candidate filenames, ordered by closeness heuristic.
  const candidates: string[] = [];
  for (const hVal of hCandidates) {
    for (const wo of wOffsets) {
      const wVal = hasW ? (dims.width + wo) : undefined;
      for (const to of tOffsets) {
        const tVal = hasT ? (dims.thickness + to) : undefined;
        const filename = pattern
          .replace(/{h}/g, (hVal ?? 0).toString())
          .replace(/{w}/g, (wVal ?? 0).toString())
          .replace(/{t}/g, (tVal ?? 0).toString())
          .replace(/{id}/g, objectName)
          .replace(/{part}/g, part ?? "");
        candidates.push(filename);
        if (candidates.length > 200) break; // safety cap
      }
      if (candidates.length > 200) break;
    }
    if (candidates.length > 200) break;
  }

  // Check candidates in order, return the first that exists
  for (const c of candidates) {
    const url = `${prefix}/${objectName}/${c}`;
    if (await existsUrl(url)) return url;
  }

  return null;
}

// Try using a sizeTable: find nearest h rows and substitute their med width/thickness
async function tryNearestFromSizeTable(
  prefix: string,
  objectName: string,
  pattern: string,
  dims: any,
  sizeTable?: DeviceDownloadConfig["sizeTable"],
  part?: string
): Promise<string | null> {
  if (!sizeTable || !sizeTable.length) return null;

  // sort rows by distance from requested height
  const rows = [...sizeTable].sort((a, b) => Math.abs((a.h ?? 0) - (dims.height ?? 0)) - Math.abs((b.h ?? 0) - (dims.height ?? 0)));

  for (const r of rows) {
    const candidateDims = {
      ...dims,
      height: r.h,
      width: r.widths?.med ?? dims.width,
      thickness: r.thickness?.med ?? dims.thickness,
    };

    const filename = formatFromPattern(pattern, objectName, candidateDims, { part });
    const url = `${prefix}/${objectName}/${filename}`;
    // DEBUG: log when we pick a size-table candidate
    // eslint-disable-next-line no-console
    console.info(`tryNearestFromSizeTable: trying h=${r.h}, w=${candidateDims.width}, t=${candidateDims.thickness} -> ${url}`);
    if (await existsUrl(url)) return url;
  }

  return null;
}

// Records guessed substitutions when HEAD checks are not available or return nothing
const guessedSubstitutions = new Map<string, string>();

function findNearestRow(sizeTable: DeviceDownloadConfig["sizeTable"], height: number) {
  if (!sizeTable || !sizeTable.length) return null;
  let best = sizeTable[0];
  let bestDist = Math.abs((best.h ?? 0) - height);
  for (const r of sizeTable) {
    const d = Math.abs((r.h ?? 0) - height);
    if (d < bestDist) {
      best = r;
      bestDist = d;
    }
  }
  return best;
}

  

async function assembleUrls(objectName: ObjectName, dimensions: Dimensions, config: DeviceDownloadConfig = {}, options: { includeHandle?: boolean } = {}) {
  const prefix = config.prefixUrl ?? PREFIX_URL;
  const urls: string[] = [];

  // static files
  if (config.staticFiles && config.staticFiles.length) {
    for (const f of config.staticFiles) {
      urls.push(joinPath(prefix, objectName, f));
    }
  }

  // variable parts (pattern + parts) e.g., button: variablePattern = "h{h}-w{w}-{part}.stl", variableParts = ["sa","sb","hook"]
  if (config.variablePattern && config.variableParts && config.variableParts.length) {
    for (const part of config.variableParts) {
      // If sizeTable exists and requested height isn't exactly in it, try to find a VERIFIED candidate (HEAD OK)
      const nearest = config.sizeTable ? findNearestRow(config.sizeTable, dimensions.height ?? 0) : null;
      if (nearest && nearest.h !== dimensions.height) {
        // Prefer a verified file (tryNearestFromSizeTable checks HEAD on rows ordered by closeness)
        const found = await tryNearestFromSizeTable(prefix, objectName, config.variablePattern, dimensions, config.sizeTable, part);
        if (found) {
          urls.push(found);
          continue;
        }

        // No verified file found. As a last resort, push a guessed substitution (nearest row) and note it
        const candidateDims = {
          ...dimensions,
          height: nearest.h,
          width: nearest.widths?.med ?? dimensions.width,
          thickness: nearest.thickness?.med ?? dimensions.thickness,
        };
        const filename = formatFromPattern(config.variablePattern, objectName, candidateDims, { part });
        const url = joinPath(prefix, objectName, filename);
        const note = `Guessed substitution: requested h=${dimensions.height} -> guessed h=${nearest.h} (w=${candidateDims.width}, t=${candidateDims.thickness})`;
        guessedSubstitutions.set(url, note);
        // eslint-disable-next-line no-console
        console.info(`sizeTable guessed substitution: ${note} -> ${url}`);
        urls.push(url);
        continue;
      }

      // Try to find an existing file; if not found, push the expected filename and let packageZip handle the missing file (it can attempt fallback if enabled)
      if (await existsUrl(`${prefix}/${objectName}/${formatFromPattern(config.variablePattern, objectName, dimensions, { part })}`)) {
        urls.push(joinPath(prefix, objectName, formatFromPattern(config.variablePattern, objectName, dimensions, { part })));
      } else {
        // attempt sizeTable-based nearest HL substitution first (auto use med widths/thickness)
        const foundFromTable = await tryNearestFromSizeTable(prefix, objectName, config.variablePattern, dimensions, config.sizeTable, part);
        if (foundFromTable) {
          urls.push(foundFromTable);
        } else {
          // attempt a closest search (height/width adjustments)
          const found = await findClosestFile(prefix, objectName, config.variablePattern, dimensions, part, 10, config.sizeTable);
          if (found) {
            urls.push(found);
          } else {
            // push the original expected URL so packageZip will show a clear error
            urls.push(joinPath(prefix, objectName, formatFromPattern(config.variablePattern, objectName, dimensions, { part })));
          }
        }
      }
    }
  } else if (config.variablePattern && (!config.variableParts || config.variableParts.length === 0)) {
    // single variable file (e.g., cup: "h{h}-t{t}.stl")
    // If the pattern requires a {part} placeholder but no parts were provided, skip it to avoid empty filenames (e.g., "h197-.stl").
    if (!config.variablePattern.includes("{part}")) {
      const filename = formatFromPattern(config.variablePattern, objectName, dimensions);
      // check if exists or try closest
      // If sizeTable exists and requested height isn't in it, attempt a verified row first
      const nearest = config.sizeTable ? findNearestRow(config.sizeTable, dimensions.height ?? 0) : null;
      if (nearest && nearest.h !== dimensions.height) {
        const found = await tryNearestFromSizeTable(prefix, objectName, config.variablePattern, dimensions, config.sizeTable);
        if (found) {
          urls.push(found);
        }
        // No verified file found: fall through to normal checks and possibly guessed substitution below
      }

      if (await existsUrl(`${prefix}/${objectName}/${filename}`)) {
        urls.push(joinPath(prefix, objectName, filename));
      } else {
        const foundFromTable = await tryNearestFromSizeTable(prefix, objectName, config.variablePattern, dimensions, config.sizeTable);
        if (foundFromTable) {
          urls.push(foundFromTable);
        } else {
          const found = await findClosestFile(prefix, objectName, config.variablePattern, dimensions, undefined, 10, config.sizeTable);
          if (found) urls.push(found);
          else {
            // If we have a nearest row, push a guessed substitution (record note) as last resort
            if (nearest && nearest.h !== dimensions.height) {
              const candidateDims = {
                ...dimensions,
                height: nearest.h,
                width: nearest.widths?.med ?? dimensions.width,
                thickness: nearest.thickness?.med ?? dimensions.thickness,
              };
              const guessed = joinPath(prefix, objectName, formatFromPattern(config.variablePattern, objectName, candidateDims));
              const note = `Guessed substitution: requested h=${dimensions.height} -> guessed h=${nearest.h} (w=${candidateDims.width}, t=${candidateDims.thickness})`;
              guessedSubstitutions.set(guessed, note);
              urls.push(guessed);
            } else {
              urls.push(joinPath(prefix, objectName, filename));
            }
          }
        }
      }
    }
  }

  // cutlery special: choose parts based on includeHandle option
  if (config.handleYesParts || config.handleNoParts) {
    const parts = options.includeHandle ? config.handleYesParts ?? [] : config.handleNoParts ?? [];
    for (const part of parts) {
      // If sizeTable exists and requested height isn't in it, substitute nearest row (auto med) for each part
      const nearestPart = config.sizeTable ? findNearestRow(config.sizeTable, dimensions.height ?? 0) : null;
      if (nearestPart && nearestPart.h !== dimensions.height) {
        const candidateDims = {
          ...dimensions,
          height: nearestPart.h,
          width: nearestPart.widths?.med ?? dimensions.width,
          thickness: nearestPart.thickness?.med ?? dimensions.thickness,
        };
        let substitutedFilename: string;
        if (part === "handle" && config.handlePattern) {
          substitutedFilename = formatFromPattern(config.handlePattern, objectName, candidateDims, { part });
        } else if (config.variablePattern) {
          substitutedFilename = formatFromPattern(config.variablePattern, objectName, candidateDims, { part });
        } else {
          substitutedFilename = `${part}.stl`;
        }
        const substituted = joinPath(prefix, objectName, substitutedFilename);
        // eslint-disable-next-line no-console
        console.info(`sizeTable substitution (part): requested h=${dimensions.height} -> using h=${nearestPart.h} -> ${substituted}`);
        urls.push(substituted);
        continue;
      }
      if (part === "handle" && config.handlePattern) {
        const nearestHandle = config.sizeTable ? findNearestRow(config.sizeTable, dimensions.height ?? 0) : null;
        if (nearestHandle && nearestHandle.h !== dimensions.height) {
          const found = await tryNearestFromSizeTable(prefix, objectName, config.handlePattern, dimensions, config.sizeTable, part);
          if (found) {
            urls.push(found);
            continue;
          }
        }

        const filename = formatFromPattern(config.handlePattern, objectName, dimensions, { part });
        // check existence or find closest
        if (await existsUrl(`${prefix}/${objectName}/${filename}`)) {
          urls.push(joinPath(prefix, objectName, filename));
        } else {
          const foundFromTable = await tryNearestFromSizeTable(prefix, objectName, config.handlePattern, dimensions, config.sizeTable, part);
          if (foundFromTable) urls.push(foundFromTable);
          else {
            const found = await findClosestFile(prefix, objectName, config.handlePattern, dimensions, part, 10, config.sizeTable);
            if (found) urls.push(found);
            else {
              // guessed substitution as last resort
              if (nearestHandle && nearestHandle.h !== dimensions.height) {
                const candidateDims = {
                  ...dimensions,
                  height: nearestHandle.h,
                  width: nearestHandle.widths?.med ?? dimensions.width,
                  thickness: nearestHandle.thickness?.med ?? dimensions.thickness,
                };
                const guessed = joinPath(prefix, objectName, formatFromPattern(config.handlePattern, objectName, candidateDims, { part }));
                const note = `Guessed substitution: requested h=${dimensions.height} -> guessed h=${nearestHandle.h} (w=${candidateDims.width}, t=${candidateDims.thickness})`;
                guessedSubstitutions.set(guessed, note);
                urls.push(guessed);
              } else urls.push(joinPath(prefix, objectName, filename));
            }
          }
        }
        continue;
      }

      if (config.variablePattern) {
        const filename = formatFromPattern(config.variablePattern, objectName, dimensions, { part });
        if (await existsUrl(`${prefix}/${objectName}/${filename}`)) {
          urls.push(joinPath(prefix, objectName, filename));
        } else {
          const foundFromTable = await tryNearestFromSizeTable(prefix, objectName, config.variablePattern, dimensions, config.sizeTable, part);
          if (foundFromTable) urls.push(foundFromTable);
          else {
            const found = await findClosestFile(prefix, objectName, config.variablePattern, dimensions, part, 10, config.sizeTable);
            if (found) urls.push(found);
            else urls.push(joinPath(prefix, objectName, filename));
          }
        }
      } else {
        const filename = `${part}.stl`;
        if (await existsUrl(`${prefix}/${objectName}/${filename}`)) {
          urls.push(joinPath(prefix, objectName, filename));
        } else {
          urls.push(joinPath(prefix, objectName, filename));
        }
      }
    }
  }

  // instructions file if requested
  if (config.includeInstructions ?? true) {
    urls.push(joinPath(prefix, objectName, INSTRUCTIONS_FILE));
  }

  return urls;
}

// Public helper: resolve the URLs that would be fetched for a download (useful for previewing/debugging)
export async function getDownloadUrls(objectName: ObjectName, dimensions: Dimensions, deviceConfig?: DeviceDownloadConfig, options?: { includeHandle?: boolean }) {
  return await assembleUrls(objectName, dimensions, deviceConfig ?? {}, options ?? {});
}

export async function downloadObject(
  objectName: ObjectName,
  dimensions: Dimensions,
  deviceConfig?: DeviceDownloadConfig,
  options?: { includeHandle?: boolean }
) {
  const urls = await assembleUrls(objectName, dimensions, deviceConfig ?? {}, options ?? {});

  // DEBUG: Log the URLs the client will fetch (helps debug why "nothing happens")
  // This will appear in the browser console when Download is clicked.
  // Keep it short to avoid leaking sensitive info in production.
  // eslint-disable-next-line no-console
  console.log("downloadObject: fetching files:", urls);

  let packagedZip: Blob;
  try {
    packagedZip = await packageZip(urls);
  } catch (err) {
    // Bubble up error so caller can present a friendly message
    // eslint-disable-next-line no-console
    console.error("downloadObject: packaging failed", err);
    // If fetch failed at network level in browser it often manifests as 'TypeError: Failed to fetch'
    // Provide a clearer message to the caller to help debugging CORS/network issues.
    if (err instanceof Error && err.message && err.message.includes("Failed to fetch")) {
      const message =
        "Network error while fetching files (Failed to fetch). This often means the files are blocked by CORS or network issues. " +
        "Ensure your Cloudflare R2 bucket allows cross-origin requests or deploy a small proxy worker that adds CORS headers (see README for an example).";
      throw new Error(message);
    }
    throw err;
  }

  const a = document.createElement("a");
  a.href = URL.createObjectURL(packagedZip);
  a.download = `${objectName}.zip`;
  a.click();
  URL.revokeObjectURL(a.href);
}

export type Diagnostic = {
  url: string;
  status: "ok" | "not-found" | "error" | "network";
  statusCode?: number;
  message?: string;
};

export async function getDownloadDiagnostics(
  objectName: ObjectName,
  dimensions: Dimensions,
  deviceConfig?: DeviceDownloadConfig,
  options?: { includeHandle?: boolean }
): Promise<Diagnostic[]> {
  const urls = await assembleUrls(objectName, dimensions, deviceConfig ?? {}, options ?? {});
  const results: Diagnostic[] = [];
  for (const url of urls) {
    try {
      const res = await fetch(url, { method: "HEAD" });
      const note = detectSubstitution(url, objectName, dimensions, deviceConfig);
      if (res.ok) {
        results.push({ url, status: "ok", statusCode: res.status, message: note ?? undefined });
      } else if (res.status === 404) {
        results.push({ url, status: "not-found", statusCode: res.status, message: note ?? undefined });
      } else {
        results.push({ url, status: "error", statusCode: res.status, message: `${res.statusText}${note ? ` — ${note}` : ""}` });
      }
    } catch (err: any) {
      // network or CORS blocked the request
      const note = detectSubstitution(url, objectName, dimensions, deviceConfig);
      results.push({ url, status: "network", message: `${err?.message ?? String(err)}${note ? ` — ${note}` : ""}` });
    }
  }
  return results;
}

function detectSubstitution(url: string, objectName: string, dimensions: Dimensions, deviceConfig?: DeviceDownloadConfig) {
  // guessed substitution recorded earlier?
  if (guessedSubstitutions.has(url)) return guessedSubstitutions.get(url) ?? null;
  if (!deviceConfig || !deviceConfig.sizeTable || !deviceConfig.sizeTable.length) return null;

  // get filename part after objectName
  const parts = url.split("/");
  const idx = parts.indexOf(objectName);
  const filename = idx >= 0 ? parts.slice(idx + 1).join("/") : parts[parts.length - 1];

  const tryRows = deviceConfig.sizeTable;

  const cmp = (gen: string) => gen === filename;

  if (deviceConfig.variablePattern && deviceConfig.variableParts && deviceConfig.variableParts.length) {
    for (const r of tryRows) {
      for (const part of deviceConfig.variableParts) {
        const candidateDims = {
          ...dimensions,
          height: r.h,
          width: r.widths?.med ?? dimensions.width,
          thickness: r.thickness?.med ?? (dimensions as any).thickness,
        };
        const gen = formatFromPattern(deviceConfig.variablePattern, objectName, candidateDims, { part });
        if (cmp(gen)) return `Substituted: requested h=${dimensions.height} -> used h=${r.h} (w=${candidateDims.width}, t=${candidateDims.thickness})`;
      }
    }
  }

  if (deviceConfig.variablePattern) {
    for (const r of tryRows) {
      const candidateDims = {
        ...dimensions,
        height: r.h,
        width: r.widths?.med ?? dimensions.width,
        thickness: r.thickness?.med ?? (dimensions as any).thickness,
      };
      const gen = formatFromPattern(deviceConfig.variablePattern, objectName, candidateDims);
      if (cmp(gen)) return `Substituted: requested h=${dimensions.height} -> used h=${r.h} (w=${candidateDims.width}, t=${candidateDims.thickness})`;
    }
  }

  if (deviceConfig.handlePattern) {
    for (const r of tryRows) {
      const candidateDims = {
        ...dimensions,
        height: r.h,
        width: r.widths?.med ?? dimensions.width,
        thickness: r.thickness?.med ?? (dimensions as any).thickness,
      };
      const gen = formatFromPattern(deviceConfig.handlePattern, objectName, candidateDims, { part: "handle" });
      if (cmp(gen)) return `Substituted: requested h=${dimensions.height} -> used h=${r.h} (w=${candidateDims.width}, t=${candidateDims.thickness})`;
    }
  }

  return null;
}
