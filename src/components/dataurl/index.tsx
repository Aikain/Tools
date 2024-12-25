'use client';

import { usePlausible } from 'next-plausible';
import { RefObject, createRef, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import ContentCopyIcon from '@/icons/content-copy.svg';
import { nanoid } from 'nanoid';

import styles from './styles.module.scss';

type DataURLFile = {
    id: string;
    name: string;
    dataURL: string | null;
    nodeRef: RefObject<HTMLDivElement | null>;
};

const DataURL = () => {
    const plausible = usePlausible();
    const [dataURLs, setDataURLs] = useState<DataURLFile[]>([]);

    const onDrop = useCallback(
        (acceptedFiles: File[]) => {
            acceptedFiles.forEach((file) => {
                const id = nanoid();
                setDataURLs((old) => [...old, { id, name: file.name, dataURL: null, nodeRef: createRef() }]);

                const reader = new FileReader();

                reader.onload = () =>
                    setDataURLs((old) =>
                        old.map((value) => (value.id === id ? { ...value, dataURL: reader.result as string } : value)),
                    );

                reader.readAsDataURL(file);

                plausible('dataurl-convert');
            });
        },
        [plausible],
    );

    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

    const handleCopyToClipboard = (dataURL: string) => {
        void navigator.clipboard.writeText(dataURL);
    };

    return (
        <div className={styles.layout}>
            <div {...getRootProps({ className: `${styles.dropzone} ${isDragActive ? styles.dragActive : ''}` })}>
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
                        <div className={styles.card} ref={nodeRef}>
                            <div className={styles.header}>
                                <span className={styles.name}>{name}</span>
                                {dataURL && (
                                    <div
                                        className={styles.iconButton}
                                        onClick={() => handleCopyToClipboard(dataURL)}
                                        aria-label='Copy to clipboard'>
                                        <ContentCopyIcon />
                                    </div>
                                )}
                            </div>
                            <div className={styles.content}>
                                {dataURL && (
                                    <span className={styles.dataURL} onClick={() => handleCopyToClipboard(dataURL)}>
                                        {dataURL.substring(0, 250)}
                                    </span>
                                )}
                            </div>
                        </div>
                    </CSSTransition>
                ))}
            </TransitionGroup>
        </div>
    );
};

export default DataURL;
