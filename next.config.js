/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Generates static HTML export
  images: {
    unoptimized: true, // Required for static export
  },
  basePath: '/taskora', // Replace 'taskora' with your repository name
}

module.exports = nextConfig 