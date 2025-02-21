import type { Metadata } from 'next';

import DataURL from '@/components/dataurl';

import styles from './styles.module.scss';

export const metadata: Metadata = {
    title: 'Convert file to “data” URL',
    description: 'Convert the file to a "data" URL according to RFC2397-standard directly in your browser',
};

const Page = () => (
    <div className={styles.page}>
        <h1>Convert file to &ldquo;data&rdquo; URL</h1>
        <DataURL />
    </div>
);

export default Page;
