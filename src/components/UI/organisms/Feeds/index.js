import React, { useEffect, useState } from 'react'
import { firebaseFireStore } from '../../../../config/firebase/';
import { fetchDataFeeds } from '../../../../utils/fetchData';

import { SimpleGrid, Box, Flex } from '@chakra-ui/react';

import SpinnerLoad from '../../atoms/SpinnerLoad/';

function Feeds() {
    const [feeds, setFeeds] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getFeed = () => {
            return new Promise((resolve, reject) => {
                resolve(fetchDataFeeds(firebaseFireStore).then((feed) => feed).then(data => data));
                reject('Error Cannot Get Data');
            });
        };
        setLoading(true);

        getFeed().then(data => {
            setFeeds(data);
            setLoading(false);
        });
    }, []);

    return (
        loading ? (
            <Flex
                justifyContent={'center'}
                alignItems={'center'}
                width={'full'}
                height={'70vh'}
            >
                <SpinnerLoad message={'Loading..'} />
            </Flex>) : (

            <SimpleGrid minChildWidth='120px' spacing='16px' width={'full'}>
                <Box bg='tomato' height='80px'></Box>
                <Box bg='tomato' height='80px'></Box>
                <Box bg='tomato' height='80px'></Box>
                <Box bg='tomato' height='80px'></Box>
                <Box bg='tomato' height='80px'></Box>
                <Box bg='tomato' height='80px'></Box>
            </SimpleGrid>
        )
    )

}

export default Feeds;