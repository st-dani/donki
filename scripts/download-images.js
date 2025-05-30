const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');

// Configuration
const IMAGE_DIR = path.join(process.cwd(), 'public', 'images', 'menu');
const QUALITY = 85;
const MIN_WIDTH = 1920;
const MIN_HEIGHT = 1080;
const IMAGE_FORMAT = 'webp';

// Create directory if it doesn't exist
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// Function to download image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download: ${response.statusCode}`));
        return;
      }

      const chunks = [];
      response.on('data', (chunk) => chunks.push(chunk));
      response.on('end', () => resolve(Buffer.concat(chunks)));
      response.on('error', reject);
    }).on('error', reject);
  });
}

// Function to process image
async function processImage(buffer, filename) {
  try {
    const image = sharp(buffer);
    const metadata = await image.metadata();

    // Calculate new dimensions
    const aspectRatio = metadata.width / metadata.height;
    let newWidth = Math.max(MIN_WIDTH, metadata.width);
    let newHeight = Math.round(newWidth / aspectRatio);

    if (newHeight < MIN_HEIGHT) {
      newHeight = MIN_HEIGHT;
      newWidth = Math.round(newHeight * aspectRatio);
    }

    // Process and save image
    await image
      .resize(newWidth, newHeight)
      .webp({ quality: QUALITY })
      .toFile(path.join(IMAGE_DIR, `${filename}.${IMAGE_FORMAT}`));

    console.log(`Successfully processed ${filename}`);
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
}

// Images to download
const images = {
  // 분식 (Korean Street Food)
  'cheese-tteokbokki': 'https://images.unsplash.com/photo-1563255617-5ccb05de4496',
  'rabokki': 'https://images.unsplash.com/photo-1580651315530-69c8e0026377',
  'tempura-set': 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327',
  
  // 핫도그 (Hot Dogs)
  'crispy-hotdog': 'https://images.unsplash.com/photo-1612392062631-94dd858cba88',
  'cheese-hotdog': 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a',
  'potato-hotdog': 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a',
  
  // 타코 (Tacos)
  'bulgogi-taco': 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
  'dakgalbi-taco': 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47',
  'shrimp-taco': 'https://images.unsplash.com/photo-1611250188496-e966043a0629',
  
  // 커피/음료 (Beverages)
  'americano': 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
  'cafe-latte': 'https://images.unsplash.com/photo-1541167760496-1628856ab772',
  'strawberry-smoothie': 'https://images.unsplash.com/photo-1553530666-ba11a7da3888'
};

// Main function
async function main() {
  console.log('Starting image download and optimization process...');

  for (const [filename, url] of Object.entries(images)) {
    try {
      console.log(`Processing ${filename}...`);
      const buffer = await downloadImage(url);
      await processImage(buffer, filename);
    } catch (error) {
      console.error(`Failed to process ${filename}:`, error);
    }
  }

  console.log('Image processing completed');
}

main().catch(console.error); 