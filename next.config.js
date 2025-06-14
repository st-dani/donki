/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['utfs.io'], // 외부 이미지 도메인 허용
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'utfs.io',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'cdn.pixabay.com',
      },
      {
        protocol: 'https',
        hostname: 'blogthumb.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'blogpfthumb.phinf.naver.net',
      },
      {
        protocol: 'https',
        hostname: '*.pstatic.net',
      },
      {
        protocol: 'https',
        hostname: 'utfs.io',
      },
    ],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ['image/webp'],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['@heroicons/react'],
  },
  transpilePackages: ['@heroicons/react', 'framer-motion'],
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
  poweredByHeader: false,
  reactStrictMode: true,
  productionBrowserSourceMaps: true,
  webpack: (config, { isServer }) => {
    // 웹팩 설정 최적화
    config.optimization = {
      ...config.optimization,
      moduleIds: 'deterministic',
    }
    
    return config
  },
};

module.exports = nextConfig; 