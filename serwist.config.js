import { serwist } from '@serwist/next/config';

const serwistConfig = serwist({
    swSrc: 'src/app/sw.ts',
    swDest: 'public/sw.js',
});

export default serwistConfig;
