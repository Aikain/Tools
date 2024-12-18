import type { NextConfig } from 'next';

import nextBundleAnalyzer from '@next/bundle-analyzer';

const nextConfig: NextConfig = {
    output: 'export',

    images: {
        unoptimized: true,
    },

    webpack: (config) => ({
        ...config,

        module: {
            ...config.module,
            rules: [
                ...config.module.rules,
                {
                    test: /\.svg$/,
                    use: ['@svgr/webpack'],
                },
            ],
        },
    }),

    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
};

const withBundleAnalyzer = nextBundleAnalyzer({
    enabled: process.env.ANALYZE === 'true',
    openAnalyzer: false,
});

export default withBundleAnalyzer(nextConfig);
