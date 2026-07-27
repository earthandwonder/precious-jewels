#!/usr/bin/env node
/**
 * Full image pipeline:
 * 1. Takes raw product images from public/samples/raw/
 * 2. Removes backgrounds via rembg (Python, local)
 * 3. Trims transparent pixels and resizes via Sharp
 * 4. Outputs to public/samples/
 *
 * Usage: node scripts/process-images.mjs [--max 800]
 *
 * Drop raw images as: public/samples/raw/Peridot1.jpg (or .png, .webp)
 * Output will be:     public/samples/Peridot1.png
 */
import sharp from "sharp";
import { readdir, access, unlink } from "fs/promises";
import { join, parse } from "path";
import { execFileSync } from "child_process";

const ROOT = join(import.meta.dirname, "..");
const RAW_DIR = join(ROOT, "public/samples/raw");
const OUT_DIR = join(ROOT, "public/samples");
const VENV_REMBG = join(ROOT, ".venv/bin/rembg");
const MAX_SIZE = parseInt(process.argv[process.argv.indexOf("--max") + 1]) || 800;

// Check rembg is available
try {
  await access(VENV_REMBG);
} catch {
  console.error("rembg not found at", VENV_REMBG);
  console.error("Run: python3 -m venv .venv && source .venv/bin/activate && pip install 'rembg[cli]'");
  process.exit(1);
}

const files = (await readdir(RAW_DIR)).filter((f) =>
  /\.(png|jpe?g|webp|bmp|tiff?|avif|heic)$/i.test(f)
);

if (files.length === 0) {
  console.log("No images found in public/samples/raw/");
  console.log("Drop raw product images there and re-run.");
  process.exit(0);
}

console.log(`Processing ${files.length} images...\n`);

for (const file of files) {
  const { name } = parse(file);
  const inputPath = join(RAW_DIR, file);
  const outputPath = join(OUT_DIR, `${name}.png`);

  process.stdout.write(`  ${file}: `);

  // Step 0: Convert unsupported formats to PNG for rembg
  const ext = parse(file).ext.toLowerCase();
  let rembgInput = inputPath;
  const needsConvert = [".avif", ".heic"].includes(ext);
  if (needsConvert) {
    const tmpPath = join(OUT_DIR, `_tmp_${name}.png`);
    await sharp(inputPath).png().toFile(tmpPath);
    rembgInput = tmpPath;
    process.stdout.write("converted → ");
  }

  // Step 1: Remove background with rembg
  try {
    execFileSync(VENV_REMBG, ["i", rembgInput, outputPath], {
      timeout: 120000,
      stdio: ["pipe", "pipe", "pipe"],
    });
    if (needsConvert) await unlink(rembgInput);
    process.stdout.write("bg removed → ");
  } catch (err) {
    if (needsConvert) await unlink(rembgInput).catch(() => {});
    console.log(`FAILED (rembg error: ${err.message})`);
    continue;
  }

  // Step 2: Trim transparent pixels
  const img = sharp(outputPath);
  const { width: preW, height: preH } = await img.metadata();
  const trimmed = await img.trim().toBuffer({ resolveWithObject: true });
  const { width: trimW, height: trimH } = trimmed.info;

  // Step 3: Resize if needed
  let final = sharp(trimmed.data);
  let resized = false;
  if (trimW > MAX_SIZE || trimH > MAX_SIZE) {
    final = final.resize(MAX_SIZE, MAX_SIZE, { fit: "inside" });
    resized = true;
  }

  await final.png().toFile(outputPath);
  const { width: finalW, height: finalH } = await sharp(outputPath).metadata();

  console.log(
    `${preW}x${preH} → trimmed ${trimW}x${trimH}${resized ? ` → resized ${finalW}x${finalH}` : ""}`
  );
}

console.log("\nDone. Output in public/samples/");
