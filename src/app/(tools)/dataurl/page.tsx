import type { Metadata } from 'next';

import DataURL from '@/components/dataurl';

import { metadata as layoutMetadata } from '../../layout';
import styles from './styles.module.scss';

const TITLE = 'Convert file to “data” URL';
const DESCRIPTION = 'Convert the file to a "data" URL according to RFC2397-standard directly in your browser';

export const metadata: Metadata = {
    title: TITLE,
    description: DESCRIPTION,
    openGraph: {
        ...layoutMetadata.openGraph,
        title: TITLE,
        description: DESCRIPTION,
    },
    twitter: {
        ...layoutMetadata.twitter,
        title: TITLE,
        description: DESCRIPTION,
    },
};

const Page = () => (
    <div className={styles.page}>
        <h1>Convert file to &ldquo;data&rdquo; URL</h1>
        <DataURL />
    </div>
);

export default Page;
