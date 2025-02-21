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
                <HandymanIcon width={135} height={135} />
            </div>
        ),
        {
            headers: {
                'Content-Type': 'image/png',
            },
            height: 180,
            width: 180,
        },
    );

export const dynamic = 'force-static';
