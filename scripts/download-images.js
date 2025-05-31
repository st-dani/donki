const fs = require('fs');
const path = require('path');
const https = require('https');
const sharp = require('sharp');
const fetch = require('node-fetch');

// Configuration
const IMAGE_DIR = path.join(process.cwd(), 'public', 'images');
const QUALITY = 85;
const MIN_WIDTH = 1920;
const MIN_HEIGHT = 1080;
const IMAGE_FORMAT = 'webp';

// Create directory if it doesn't exist
if (!fs.existsSync(IMAGE_DIR)) {
  fs.mkdirSync(IMAGE_DIR, { recursive: true });
}

// Function to download image
async function downloadImage(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download: ${response.status}`);
  }
  return response.buffer();
}

// Function to process image
async function processImage(buffer, filename, options = {}) {
  try {
    const image = sharp(buffer);
    const metadata = await image.metadata();

    // Calculate new dimensions
    const aspectRatio = metadata.width / metadata.height;
    let newWidth = Math.max(options.width || MIN_WIDTH, metadata.width);
    let newHeight = Math.round(newWidth / aspectRatio);

    if (newHeight < (options.height || MIN_HEIGHT)) {
      newHeight = options.height || MIN_HEIGHT;
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

// Images to download with parameters for better quality
const images = {
  // 메인 페이지 이미지
  'hero-background': {
    url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47',
    width: 1920,
    height: 1080
  },
  'about-1': {
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38',
    width: 800,
    height: 600
  },
  'about-2': {
    url: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828',
    width: 800,
    height: 600
  },
  'service-1': {
    url: 'https://images.unsplash.com/photo-1565299586001-b5098a3432cf',
    width: 800,
    height: 600
  },
  'service-2': {
    url: 'https://images.unsplash.com/photo-1565299501941-7e5d5f2c0a13',
    width: 800,
    height: 600
  },
  
  // 카테고리 이미지
  'popular-category': {
    url: 'https://images.unsplash.com/photo-1583032015879-e5022cb87c3b',
    width: 800,
    height: 600
  },
  'bunsik-category': {
    url: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377',
    width: 800,
    height: 600
  },
  'hotdog-category': {
    url: 'https://images.unsplash.com/photo-1612392062631-94dd858cba88',
    width: 800,
    height: 600
  },
  'taco-category': {
    url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
    width: 800,
    height: 600
  },
  'beverage-category': {
    url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd',
    width: 800,
    height: 600
  },
  
  // 메뉴 이미지
  'cheese-tteokbokki': {
    url: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377',
    width: 800,
    height: 600
  },
  'rabokki': {
    url: 'https://images.unsplash.com/photo-1580651315530-69c8e0026377',
    width: 800,
    height: 600
  },
  'tempura-set': {
    url: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327',
    width: 800,
    height: 600
  },
  'crispy-hotdog': {
    url: 'https://images.unsplash.com/photo-1612392062631-94dd858cba88',
    width: 800,
    height: 600
  },
  'cheese-hotdog': {
    url: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a',
    width: 800,
    height: 600
  },
  'potato-hotdog': {
    url: 'https://images.unsplash.com/photo-1619740455993-9e612b1af08a',
    width: 800,
    height: 600
  },
  'bulgogi-taco': {
    url: 'https://images.unsplash.com/photo-1551504734-5ee1c4a1479b',
    width: 800,
    height: 600
  },
  'dakgalbi-taco': {
    url: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47',
    width: 800,
    height: 600
  },
  'shrimp-taco': {
    url: 'https://images.unsplash.com/photo-1611250188496-e966043a0629',
    width: 800,
    height: 600
  }
};

// Main function
async function main() {
  console.log('Starting image download and optimization process...');

  for (const [filename, imageConfig] of Object.entries(images)) {
    try {
      console.log(`Processing ${filename}...`);
      const buffer = await downloadImage(`${imageConfig.url}?w=${imageConfig.width}&h=${imageConfig.height}&fit=crop&q=85`);
      await processImage(buffer, filename, {
        width: imageConfig.width,
        height: imageConfig.height
      });
    } catch (error) {
      console.error(`Failed to process ${filename}:`, error);
    }
  }

  console.log('Image processing completed');
}

main().catch(console.error); 