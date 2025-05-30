import os
import requests
from PIL import Image
from io import BytesIO
import logging

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Configuration
IMAGE_DIR = "public/images/menu"
QUALITY = 85
MIN_WIDTH = 1920
MIN_HEIGHT = 1080
IMAGE_FORMAT = "webp"

# Create directory if it doesn't exist
os.makedirs(IMAGE_DIR, exist_ok=True)

def download_and_optimize_image(url, filename):
    """
    Downloads an image from URL and optimizes it according to our requirements
    """
    try:
        # Download image
        response = requests.get(url)
        response.raise_for_status()
        
        # Open image with Pillow
        img = Image.open(BytesIO(response.content))
        
        # Convert to RGB if necessary
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        # Calculate new dimensions while maintaining aspect ratio
        aspect_ratio = img.width / img.height
        new_width = max(MIN_WIDTH, img.width)
        new_height = int(new_width / aspect_ratio)
        
        if new_height < MIN_HEIGHT:
            new_height = MIN_HEIGHT
            new_width = int(new_height * aspect_ratio)
        
        # Resize image
        img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Save as WebP
        output_path = os.path.join(IMAGE_DIR, f"{filename}.{IMAGE_FORMAT}")
        img.save(output_path, format=IMAGE_FORMAT, quality=QUALITY)
        logger.info(f"Successfully processed {filename}")
        
        return output_path
    
    except Exception as e:
        logger.error(f"Error processing {filename}: {str(e)}")
        return None

# Image URLs to download (to be replaced with actual URLs)
images_to_download = {
    # 분식 (Korean Street Food)
    "cheese-tteokbokki": "https://example.com/tteokbokki.jpg",
    "rabokki": "https://example.com/rabokki.jpg",
    "tempura-set": "https://example.com/tempura.jpg",
    
    # 핫도그 (Hot Dogs)
    "crispy-hotdog": "https://example.com/crispy-hotdog.jpg",
    "cheese-hotdog": "https://example.com/cheese-hotdog.jpg",
    "potato-hotdog": "https://example.com/potato-hotdog.jpg",
    
    # 타코 (Tacos)
    "bulgogi-taco": "https://example.com/bulgogi-taco.jpg",
    "dakgalbi-taco": "https://example.com/dakgalbi-taco.jpg",
    "shrimp-taco": "https://example.com/shrimp-taco.jpg",
    
    # 커피/음료 (Beverages)
    "americano": "https://example.com/americano.jpg",
    "cafe-latte": "https://example.com/latte.jpg",
    "strawberry-smoothie": "https://example.com/smoothie.jpg"
}

def main():
    """
    Main function to process all images
    """
    logger.info("Starting image download and optimization process...")
    
    for filename, url in images_to_download.items():
        output_path = download_and_optimize_image(url, filename)
        if output_path:
            logger.info(f"Saved optimized image to {output_path}")
        else:
            logger.error(f"Failed to process {filename}")
    
    logger.info("Image processing completed")

if __name__ == "__main__":
    main() 