import type { NextConfig } from 'next';

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

    turbopack: {
        rules: {
            '*.svg': {
                loaders: ['@svgr/webpack'],
                as: '*.js',
            },
        },
    },
};

export default nextConfig;
