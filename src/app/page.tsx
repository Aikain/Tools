import Link from 'next/link';

import styles from './styles.module.scss';

const tools = [
    {
        title: 'Convert file to “data” URL',
        description: 'Convert the file to a "data" URL according to RFC2397-standard directly in your browser',
        path: 'dataurl',
    },
];

const Page = () => (
    <div className={styles.page}>
        <h1 className={styles.title}>Simple web tools</h1>
        <hr className={styles.divider} />
        <div className={styles.cards}>
            {tools.map(({ title, description, path }) => (
                <Link key={path} className={styles.card} href={path}>
                    <div className={styles.header}>
                        <h2>{title}</h2>
                    </div>
                    <div className={styles.content}>
                        <span>{description}</span>
                    </div>
                </Link>
            ))}
        </div>
    </div>
);

export default Page;
