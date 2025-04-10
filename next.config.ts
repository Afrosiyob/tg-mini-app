import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: true
      },
      {
        source: '/',
        destination: '/dashboard',
        permanent: true
      },
      {
        source: '/auth',
        destination: '/auth/signin',
        permanent: true
      }
    ];
  },
  productionBrowserSourceMaps: true
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
