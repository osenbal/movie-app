import React from 'react';
import { Flex } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

function VideoItem({ data }) {
    return (
        <Flex
            justifyContent={'flex-start'}
            alignItems={'center'}
            height={'240px'}
            direction={'column'}
            position={'relative'}
            cursor={'pointer'}
            shadow={'sm'}
            _hover={{ shadow: 'md' }}
        >
            <Link to={''} style={{ backgroundColor: '#000', height: '160px', width: '100%', display: 'flex', alignItems: 'center' }}
            >
                <video src={data.videoUrl} style={{ width: '100%', height: '160px' }} muted onMouseOver={(e) => e.target.play()} onMouseOut={(e) => e.target.pause()} />
            </Link>
        </Flex >
    )
}

export default VideoItem;