import NotFoundLogger from '@/components/notFoundLogger';

import styles from './styles.module.scss';

const Page = () => (
    <div className={styles.notFound}>
        <h1>There is nothing here ...</h1>
        <NotFoundLogger />
    </div>
);

export default Page;
