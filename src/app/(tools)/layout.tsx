import Link from 'next/link';
import { ReactNode } from 'react';

import ArrowBackIcon from '@/icons/arrow-back.svg';

import styles from './styles.module.scss';

interface Props {
    children: ReactNode;
}

const Layout = ({ children }: Props) => (
    <>
        <div className={styles.backToHomePage}>
            <Link href='/'>
                <ArrowBackIcon />
            </Link>
        </div>

        {children}
    </>
);

export default Layout;
