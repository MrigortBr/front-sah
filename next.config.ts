import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  transpilePackages: ['@mui/material', '@mui/icons-material', '@mui/x-date-pickers'],
};

export default nextConfig;
