import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player';
import { Link, useParams } from 'react-router-dom';
import { Flex, Box, Text, Grid, GridItem, useColorModeValue } from '@chakra-ui/react';
import { IoHome, IoPlay } from 'react-icons/io5';

import SpinnerLoad from '../../atoms/SpinnerLoad';
import { getSpesificVideo, getUserInfo } from '../../../../utils/fetchData';
import { firebaseFireStore } from '../../../../config/firebase';

function VideoDetail() {

    const { videoId } = useParams();
    const textColor = useColorModeValue('gray.900', 'gray.50');

    const [isPlaying, setisPlaying] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [videoInfo, setvideoInfo] = useState(null);
    useEffect(() => {
        if (videoId) {
            setisLoading(true);
            getSpesificVideo(firebaseFireStore, videoId).then(data => {
                setvideoInfo(data);
            });
        }

        setisLoading(false);
    }, [videoId]);

    if (isLoading) {
        return (
            <Flex justifyContent={'center'} width={'full'} alignItems={'center'}
                height={'100vh'}
            >
                <SpinnerLoad />
            </Flex>
        )
    }
    return (
        <Flex
            width={'full'}
            height={'auto'}
            justifyContent={'center'}
            alignItems={'center'}
            direction={'column'}
            py={[0, 2]}
        >
            <Flex
                alignItems={'center'}
                width={'full'}
                my={[2, 4]}
                px={2}

            >
                <Link to={"/dashboard"}>
                    <IoHome fontSize={25} />
                </Link>
                <Box width={'1px'} height={'25px'} bg={'gray.500'} mx={2}></Box>
                <Text isTruncated
                    color={textColor}
                    fontWeight={'semibold'}
                    width={'100%'}
                >
                    {videoInfo?.title}
                </Text>
            </Flex>

            <Grid
                height={{ base: '210px', md: '300px', lg: '400px' }}
                gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
                gap={4}
                width={'100%'}
            >

                <GridItem width={'100%'} height={{ base: '210px', md: '300px', lg: '400px' }} colSpan={'2'} bg='papayawhip'>
                    <Flex width={'full'} height={'100%'} bg={'black'} position={'relative'}>
                        <ReactPlayer
                            url={videoInfo?.videoUrl}
                            width={'100%'}
                            height={'100%'}
                            controls
                            playing
                        />


                    </Flex>
                </GridItem>
                <GridItem width={'100%'} colSpan={'1'} bg='papayawhip' p={2}>
                </GridItem>
            </Grid>

        </Flex >
    )
}

export default VideoDetail;