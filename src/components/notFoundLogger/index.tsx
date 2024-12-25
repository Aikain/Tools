'use client';

import { usePlausible } from 'next-plausible';
import { useEffect } from 'react';

const NotFoundLogger = () => {
    const plausible = usePlausible();

    useEffect(() => {
        plausible(404, { props: { path: document.location.pathname } });
    }, [plausible]);

    return null;
};

export default NotFoundLogger;
