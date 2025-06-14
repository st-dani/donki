import os
import time
import requests
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
import re

def setup_driver():
    chrome_options = Options()
    # headless 모드 비활성화
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.add_argument("--disable-dev-shm-usage")
    chrome_options.add_argument("--window-size=1920,1080")
    
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=chrome_options)
    return driver

def create_download_directory():
    download_dir = "naver_blog_images"
    if not os.path.exists(download_dir):
        os.makedirs(download_dir)
    return download_dir

def is_valid_image_url(url):
    if not url:
        return False
    if url.startswith('data:'):
        return False
    parsed = urlparse(url)
    return bool(parsed.netloc) and bool(parsed.scheme)

def download_image(url, download_dir, index):
    try:
        if not is_valid_image_url(url):
            return False
            
        response = requests.get(url, timeout=10)
        if response.status_code == 200:
            # 파일 확장자 추출
            extension = url.split('.')[-1].split('?')[0].lower()
            if len(extension) > 4 or extension not in ['jpg', 'jpeg', 'png', 'gif']:
                extension = 'jpg'
            
            filename = f"image_{index}.{extension}"
            filepath = os.path.join(download_dir, filename)
            
            with open(filepath, 'wb') as f:
                f.write(response.content)
            print(f"Downloaded: {filename} from {url}")
            return True
    except Exception as e:
        print(f"Error downloading image {url}: {str(e)}")
    return False

def get_post_urls(driver, blog_url):
    print("Getting post URLs...")
    driver.get(blog_url)
    time.sleep(5)  # 로딩 대기 시간 증가
    
    # iframe으로 전환
    try:
        iframe = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "mainFrame"))
        )
        driver.switch_to.frame(iframe)
    except Exception as e:
        print(f"Error switching to iframe: {e}")
        return []
    
    # 포스트 링크 수집
    post_links = []
    try:
        elements = WebDriverWait(driver, 10).until(
            EC.presence_of_all_elements_located((By.CSS_SELECTOR, "a.link"))
        )
        for element in elements:
            href = element.get_attribute('href')
            if href and 'PostView.naver' in href:
                post_links.append(href)
    except Exception as e:
        print(f"Error finding post links: {e}")
    
    return list(set(post_links))

def extract_images_from_post(driver, post_url):
    print(f"\nProcessing post: {post_url}")
    driver.get(post_url)
    time.sleep(5)  # 로딩 대기 시간 증가
    
    # 메인 iframe으로 전환
    try:
        iframe = WebDriverWait(driver, 10).until(
            EC.presence_of_element_located((By.ID, "mainFrame"))
        )
        driver.switch_to.frame(iframe)
    except Exception as e:
        print(f"Error switching to main iframe: {e}")
        return []
    
    # 포스트 컨텐츠 대기 및 찾기
    image_urls = []
    try:
        # 새로운 에디터 (SE3)
        images = driver.find_elements(By.CSS_SELECTOR, ".se-image img, .se-module-image img")
        for img in images:
            src = img.get_attribute('src')
            if src:
                image_urls.append(src)
                
        # 이전 에디터 (SE2)
        images = driver.find_elements(By.CSS_SELECTOR, ".se_mediaImage img, ._img")
        for img in images:
            src = img.get_attribute('src')
            if src:
                image_urls.append(src)
                
    except Exception as e:
        print(f"Error finding images: {e}")
    
    return image_urls

def crawl_blog_images(blog_url):
    driver = setup_driver()
    download_dir = create_download_directory()
    image_index = 0
    
    try:
        # 블로그 포스트 URL 수집
        post_urls = get_post_urls(driver, blog_url)
        print(f"Found {len(post_urls)} posts")
        
        # 각 포스트에서 이미지 수집
        for post_url in post_urls:
            image_urls = extract_images_from_post(driver, post_url)
            print(f"Found {len(image_urls)} images in post")
            
            for url in image_urls:
                if download_image(url, download_dir, image_index):
                    image_index += 1
            
            time.sleep(2)  # 포스트 간 딜레이
        
        print(f"\nDownload completed! Total images downloaded: {image_index}")
        
    except Exception as e:
        print(f"An error occurred: {str(e)}")
    
    finally:
        driver.quit()

if __name__ == "__main__":
    blog_url = "https://blog.naver.com/kincv12"
    crawl_blog_images(blog_url) 