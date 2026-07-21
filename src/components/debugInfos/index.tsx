'use client';

import { useSyncExternalStore } from 'react';

import styles from './styles.module.scss';

const subscribe = (callback: () => void) => {
    window.addEventListener('orientationchange', callback);
    window.addEventListener('resize', callback);

    return () => {
        window.removeEventListener('orientationchange', callback);
        window.removeEventListener('resize', callback);
    };
};

type InfoItem = { name: string; value: string };
let cachedInfos: InfoItem[] = [];

const getSnapshot = (): InfoItem[] => {
    const infos: InfoItem[] = [
        { name: 'Preferred language (browser)', value: navigator.language },
        { name: 'Preferred language (OS)', value: Intl.DateTimeFormat().resolvedOptions().locale },
        {
            name: 'Screen size',
            value: `${screen.availWidth}px x ${screen.availHeight}px${screen.availWidth !== screen.width || screen.availHeight !== screen.height ? ` (${screen.width}px x ${screen.height}px)` : ''}`,
        },
        { name: 'Viewport', value: `${window.innerWidth}px x ${window.innerHeight}px` },
        { name: 'Device Pixel Ratio', value: window.devicePixelRatio.toFixed(2) },
        { name: 'User agent', value: navigator.userAgent },
    ];

    if (cachedInfos.length === infos.length && cachedInfos.every((item, i) => item.value === infos[i].value))
        return cachedInfos;

    cachedInfos = infos;
    return cachedInfos;
};

const getServerSnapshot = () => cachedInfos;

const DebugInfos = () => {
    const infos = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

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
