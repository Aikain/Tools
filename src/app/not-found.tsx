import Link from 'next/link';

import ArrowBackIcon from '@/icons/arrow-back.svg';

import NotFoundLogger from '@/components/notFoundLogger';

import styles from './styles.module.scss';

const Page = () => (
    <>
        <div className={styles.backToHomePage}>
            <Link href='/'>
                <ArrowBackIcon />
            </Link>
        </div>
        <div className={styles.notFound}>
            <h1>There is nothing here ...</h1>
        </div>
        <NotFoundLogger />
    </>
);
export default Page;
