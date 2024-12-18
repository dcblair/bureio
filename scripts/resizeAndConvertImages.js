import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import sharp from "sharp";
import fs from "fs";
import path from "path";
import { glob } from "glob";

const resizeAndConvertToWebp = async (inputPath, outputPath, sizes) => {
  for (const width of sizes) {
    const baseName = path.basename(inputPath, path.extname(inputPath));
    const outputName = `${baseName}-${width}w.webp`;
    const outputPathWithSize = path.join(outputPath, outputName);

    await sharp(inputPath)
      .resize({
        width: Number(width),
        withoutEnlargement: true,
      })
      .toFile(outputPathWithSize);

    await imagemin([outputPathWithSize], {
      destination: outputPath,
      plugins: [imageminWebp({ quality: 75 })],
    });

    console.log(`Converted ${inputPath} to ${outputPathWithSize}`);
  }
};

const resizeAndConvertImages = async () => {
  // edit this to focus on a specific folder or file
  const images = glob.sync("public/images/*.{jpg,jpeg,png}");

  for (const image of images) {
    const outputPath = path.join("public/images", "webp");
    fs.mkdirSync(outputPath, { recursive: true });

    // edit this to convert to different sizes
    await resizeAndConvertToWebp(
      image,
      outputPath,
      [320, 640, 960, 1280, 1600, 1920],
    );
  }
};

resizeAndConvertImages();
