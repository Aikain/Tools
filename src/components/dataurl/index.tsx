'use client';

import { RefObject, createRef, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContentCopyIcon from '@/icons/content-copy.svg';

import styles from './styles.module.scss';

type DataUrlFile = {
    name: string;
    dataUrl: string;
    nodeRef: RefObject<HTMLDivElement | null>;
};

const Dataurl = () => {
    const [dataUrls, setDataUrls] = useState<DataUrlFile[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                setDataUrls((old) => [
                    ...old,
                    { name: file.name, dataUrl: reader.result as string, nodeRef: createRef() },
                ]);
            };

            reader.readAsDataURL(file);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleCopyToClipboard = (dataUrl: string) => {
        void navigator.clipboard.writeText(dataUrl);
    };

    return (
        <div className={styles.layout}>
            <div {...getRootProps({ className: styles.dropzone })}>
                <input {...getInputProps()} />
                {isDragActive ? (
                    <p>Drop the files here ...</p>
                ) : (
                    <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
                )}
            </div>

            <TransitionGroup component='div' className={styles.dataUrls}>
                {dataUrls.map(({ dataUrl, name, nodeRef }, index) => (
                    <CSSTransition
                        key={index}
                        nodeRef={nodeRef}
                        timeout={500}
                        classNames={{ enter: styles.itemEnter, enterActive: styles.itemEnterActive }}>
                        <div className={styles.item} ref={nodeRef}>
                            <div className={styles.header}>
                                <span className={styles.name}>{name}</span>
                                <div
                                    className={styles.copy}
                                    onClick={() => handleCopyToClipboard(dataUrl)}
                                    aria-label='Copy to clipboard'>
                                    <ContentCopyIcon />
                                </div>
                            </div>
                            <span className={styles.dataUrl} onClick={() => handleCopyToClipboard(dataUrl)}>
                                {dataUrl}
                            </span>
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default Dataurl;
