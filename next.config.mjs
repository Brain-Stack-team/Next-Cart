/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
<<<<<<< HEAD
=======
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
>>>>>>> b3b2e6fdb86ee63cf831e473cd9787208328fdef
  },
}

export default nextConfig
