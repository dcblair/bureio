import fs from "fs";
import path from "path";
import { glob } from "glob";
import sharp from "sharp";

const DEFAULT_SIZES = [320, 640, 960, 1280, 1600, 1920];
const DEFAULT_INPUT_PATTERN = "public/images/to-convert/*.{jpg,jpeg,png}";
const DEFAULT_OUTPUT_DIR = "public/images/webp";

const parseSizes = (rawSizes) => {
  if (!rawSizes) {
    return DEFAULT_SIZES;
  }

  return rawSizes
    .split(",")
    .map((size) => Number.parseInt(size.trim(), 10))
    .filter((size) => Number.isInteger(size) && size > 0);
};

const parseInputPatterns = (rawPatterns) => {
  if (!rawPatterns) {
    return [DEFAULT_INPUT_PATTERN];
  }

  return rawPatterns
    .split(",")
    .map((pattern) => pattern.trim())
    .filter(Boolean);
};

const resizeAndConvertToWebp = async (inputPath, outputDir, sizes) => {
  const baseName = path.basename(inputPath, path.extname(inputPath));

  for (const width of sizes) {
    const outputName = `${baseName}-${width}w.webp`;
    const outputPath = path.join(outputDir, outputName);

    await sharp(inputPath)
      .resize({
        width,
        withoutEnlargement: true,
      })
      .webp({ quality: 75 })
      .toFile(outputPath);

    console.log(`Converted ${inputPath} to ${outputPath}`);
  }
};

const resizeAndConvertImages = async () => {
  const inputPatterns = parseInputPatterns(process.argv[2]);
  const outputDir = path.resolve(process.argv[3] ?? DEFAULT_OUTPUT_DIR);
  const sizes = parseSizes(process.argv[4]);

  if (!sizes.length) {
    throw new Error("Please provide at least one valid width value.");
  }

  fs.mkdirSync(outputDir, { recursive: true });

  const images = [...new Set(inputPatterns.flatMap((pattern) => glob.sync(pattern, { nodir: true })))];

  for (const image of images) {
    await resizeAndConvertToWebp(image, outputDir, sizes);
  }
};

resizeAndConvertImages().catch((error) => {
  console.error(error);
  process.exit(1);
});
