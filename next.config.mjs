/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/keyword-analysis',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
