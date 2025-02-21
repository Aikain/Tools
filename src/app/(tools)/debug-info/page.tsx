import type { Metadata } from 'next';

import DebugInfos from '@/components/debugInfos';

import styles from './styles.module.scss';

export const metadata: Metadata = {
    title: 'Show debug infos',
    description:
        'Displays basic information about the browser you are using, such as resolution or preferred language.',
};

const Page = () => (
    <div className={styles.page}>
        <h1>Debug Infos</h1>
        <DebugInfos />
    </div>
);

export default Page;
