import type { Metadata, Viewport } from 'next';
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

const APP_NAME = 'Web Tools';
const APP_DEFAULT_TITLE = 'Simple web tools';
const APP_TITLE_TEMPLATE = '%s - Simple web tools';
const APP_DESCRIPTION = 'Simple small tools made by Aikain that work directly in the browser';

export const metadata: Metadata = {
    applicationName: APP_NAME,
    title: {
        default: APP_DEFAULT_TITLE,
        template: APP_TITLE_TEMPLATE,
    },
    description: APP_DESCRIPTION,
    appleWebApp: {
        capable: true,
        statusBarStyle: 'default',
        title: APP_DEFAULT_TITLE,
    },
    formatDetection: {
        telephone: false,
    },
    openGraph: {
        type: 'website',
        siteName: APP_NAME,
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    twitter: {
        card: 'summary',
        title: {
            default: APP_DEFAULT_TITLE,
            template: APP_TITLE_TEMPLATE,
        },
        description: APP_DESCRIPTION,
    },
    icons: {
        icon: '/icon.png',
        apple: '/apple-icon.png',
    },
};

export const viewport: Viewport = {
    themeColor: '#242424',
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
