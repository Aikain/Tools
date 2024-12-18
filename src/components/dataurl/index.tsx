'use client';

import { RefObject, createRef, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContentCopyIcon from '@/icons/content-copy.svg';

import styles from './styles.module.scss';

type DataURLFile = {
    name: string;
    dataURL: string;
    nodeRef: RefObject<HTMLDivElement | null>;
};

const DataURL = () => {
    const [dataURLs, setDataURLs] = useState<DataURLFile[]>([]);

    const onDrop = useCallback((acceptedFiles: File[]) => {
        acceptedFiles.forEach((file) => {
            const reader = new FileReader();

            reader.onload = () => {
                setDataURLs((old) => [
                    ...old,
                    { name: file.name, dataURL: reader.result as string, nodeRef: createRef() },
                ]);
            };

            reader.readAsDataURL(file);
        });
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleCopyToClipboard = (dataURL: string) => {
        void navigator.clipboard.writeText(dataURL);
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

            <TransitionGroup component='div' className={styles.dataURLs}>
                {dataURLs.map(({ dataURL, name, nodeRef }, index) => (
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
                                    onClick={() => handleCopyToClipboard(dataURL)}
                                    aria-label='Copy to clipboard'>
                                    <ContentCopyIcon />
                                </div>
                            </div>
                            <span className={styles.dataURL} onClick={() => handleCopyToClipboard(dataURL)}>
                                {dataURL}
                            </span>
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default DataURL;
