import type { Metadata } from 'next';

import DebugInfos from '@/components/debugInfos';

import { metadata as layoutMetadata } from '../../layout';
import styles from './styles.module.scss';

const TITLE = 'Show debug infos';
const DESCRIPTION =
    'Displays basic information about the browser you are using, such as resolution or preferred language.';

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
        <h1>Debug Infos</h1>
        <DebugInfos />
    </div>
);

export default Page;
