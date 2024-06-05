/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'oybs-bucket.s3.amazonaws.com',
            port: '',
            pathname: '/media/**',
          },
        ],
      },
};


export default nextConfig;
