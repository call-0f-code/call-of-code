/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'strict-origin',
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nheuznumbetmqgolraku.supabase.co',
      },      
      {
        protocol: 'https',
        hostname: 'riqqtbuoaycwwiemnmri.supabase.co',
      },
    ],
  },
};

export default nextConfig;
