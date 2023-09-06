/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript:{
    ignoreBuildErrors:true,
  },
  
  reactStrictMode: true,
  images:{
    domains:['images-workbench.99static.com','lh3.googleusercontent.com'],
  }
}

module.exports = nextConfig
