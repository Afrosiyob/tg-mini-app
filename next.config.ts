import { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        destination: '/mobile/dashboard',
        permanent: true
      },
      {
        source: '/mobile',
        destination: '/mobile/dashboard',
        permanent: true
      },
      {
        source: '/mobile/auth',
        destination: '/mobile/auth/signin',
        permanent: true
      }
    ];
  },
  productionBrowserSourceMaps: true
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
