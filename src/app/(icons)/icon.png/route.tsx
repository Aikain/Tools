import { ImageResponse } from 'next/og';

import HandymanIcon from '@/icons/handyman.svg';

export const GET = () =>
    new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '100%',
                    height: '100%',
                    background: '#242424',
                    color: '#fafafa',
                }}>
                <HandymanIcon width={384} height={384} />
            </div>
        ),
        {
            headers: {
                'Content-Type': 'image/png',
            },
            height: 512,
            width: 512,
        },
    );

export const dynamic = 'force-static';
