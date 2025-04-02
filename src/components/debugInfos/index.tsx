'use client';

import { useEffect, useState } from 'react';

import styles from './styles.module.scss';

const DebugInfos = () => {
    const [infos, setInfos] = useState<{ name: string; value: string | number }[]>([]);

    const generateInfos = () =>
        setInfos([
            { name: 'Preferred language (browser)', value: navigator.language },
            { name: 'Preferred language (OS)', value: Intl.DateTimeFormat().resolvedOptions().locale },
            {
                name: 'Screen size',
                value: `${screen.availWidth}px x ${screen.availHeight}px${screen.availWidth !== screen.width || screen.availHeight !== screen.height ? ` (${screen.width}px x ${screen.height}px)` : ''}`,
            },
            { name: 'Viewport', value: `${window.innerWidth}px x ${window.innerHeight}px` },
            { name: 'Device Pixel Ratio', value: window.devicePixelRatio.toFixed(2) },
            { name: 'User agent', value: navigator.userAgent },
        ]);

    useEffect(() => {
        generateInfos();

        window.addEventListener('orientationchange', generateInfos);
        window.addEventListener('resize', generateInfos);

        return () => {
            window.removeEventListener('orientationchange', generateInfos);
            window.removeEventListener('resize', generateInfos);
        };
    }, []);

    return (
        <div className={styles.list}>
            {infos.map(({ name, value }) => (
                <div key={name} className={styles.row}>
                    <span className={styles.name}>{name}:</span>
                    <span className={styles.value}>{value}</span>
                </div>
            ))}
        </div>
    );
};

export default DebugInfos;
