import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { Routes, Route } from 'react-router-dom';

import { fetchRefreshToken, fetchUserInfo } from '../../../utils/fetchLogin.js';
import { categories } from '../../../utils/data.js';

import { Flex, Box, useMediaQuery } from '@chakra-ui/react';
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';

import { Navbar, Feed, Search, Create, VideoDetail } from '../../../components/UI/organisms/index.js';
import Categories from '../../../components/UI/molecules/Categories/index.js';
import Setting from '../../../components/UI/molecules/Setting';

const Dashboard = () => {
    const [user, setUser] = useState(null);
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const { colorMode, toggleColorMode } = useColorMode()
    const bg = useColorModeValue("gray.600", "gray.300");

    const navigate = useNavigate();

    useEffect(() => {
        const userRefreshToken = fetchRefreshToken();

        if (!userRefreshToken) {
            navigate('/login', { replace: true });
        } else {
            const [userInfo] = fetchUserInfo();
            setUser(userInfo);
        }
    }, []);


    return (
        isMobile ? <>
            <Navbar user={user} />

            <Flex
                mb={8}
            >
                <Categories datas={categories} />
            </Flex>

            <Flex
                width={'full'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Routes>
                    <Route path='/' element={<Feed />} />
                    <Route path='/category/:categoryId' element={<Feed />} />
                    <Route path='/create' element={<Create />} />
                    <Route path='/videoDetail/:videoId' element={<VideoDetail />} />
                    <Route path='/search' element={<Search />} />
                </Routes>
            </Flex>

            <Box width={'95vw'} margin={'0 auto'} left={'0'} right={'0'} position={'fixed'} py={'2'} bottom={'5'} background={bg === 'gray.300' ? 'gray.900' : 'gray.300'} rounded={'full'}>
                <Setting colorMode={colorMode} actionToggleColorMode={toggleColorMode} bgCreateButton={bg} userImage={user?.photoURL} />
            </Box>
        </>

            :
            <>
                <Navbar user={user} />


                <Flex
                    gap={4}

                >
                    <Categories datas={categories} />

                    <Flex
                        width={'full'}
                        justifyContent={'flex-end'}
                        justifySelf={'center'}
                        alignItems={'center'}
                    >

                        <Routes>
                            <Route path='/' element={<Feed />} />
                            <Route path='/category/:categoryId' element={<Feed />} />
                            <Route path='/create' element={<Create />} />
                            <Route path='/videoDetail/:videoId' element={<VideoDetail />} />
                            <Route path='/search' element={<Search />} />
                        </Routes>
                    </Flex>
                </Flex>

            </>
    )
}

export default Dashboard;
