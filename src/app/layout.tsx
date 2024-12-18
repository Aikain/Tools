import type { Metadata } from 'next';
import { Rubik } from 'next/font/google';
import { ReactNode } from 'react';

import '@/styles/globals.scss';

const rubik = Rubik({
    variable: '--font-rubik',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    title: 'Simple web tools',
    description: 'Simple small tools made by Aikain that work directly in the browser',
};

interface Props {
    children: ReactNode;
}

const RootLayout = ({ children }: Props) => (
    <html lang='en'>
        <body className={rubik.variable}>{children}</body>
    </html>
);

export default RootLayout;
