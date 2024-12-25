import type { Metadata } from 'next';
import PlausibleProvider from 'next-plausible';
import { Rubik } from 'next/font/google';
import Link from 'next/link';
import { ReactNode } from 'react';

import GithubIcon from '@/icons/github.svg';
import '@/styles/globals.scss';

import styles from './styles.module.scss';

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
        <body className={rubik.variable}>
            {process.env.NEXT_PUBLIC_SITE_URL && (
                <PlausibleProvider
                    customDomain={process.env.PLAUSIBLE_URL}
                    domain={new URL(process.env.NEXT_PUBLIC_SITE_URL).hostname}
                    enabled={!!process.env.PLAUSIBLE_URL}
                    selfHosted
                    trackLocalhost
                    taggedEvents
                    trackOutboundLinks
                />
            )}

            <div className={styles.root}>
                <div className={styles.contentWrapper}>
                    <div className={styles.content}>{children}</div>

                    <div className={styles.githubLink}>
                        <Link href='https://github.com/Aikain/Tools' target='_blank'>
                            <GithubIcon />
                        </Link>
                    </div>
                </div>
            </div>
        </body>
    </html>
);

export default RootLayout;
