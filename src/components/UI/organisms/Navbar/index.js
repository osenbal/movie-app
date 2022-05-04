import React from 'react'
import { Link } from 'react-router-dom';

import { Flex, useMediaQuery } from "@chakra-ui/react"
import { useColorMode, useColorModeValue } from '@chakra-ui/color-mode';

import Logo from '../../atoms/Logo';
import SearchInput from '../../atoms/SearchInput';
import Setting from '../../molecules/Setting';

import logo from '../../../../assets/img/logos/logo.png';
import logoDark from '../../../../assets/img/logos/logo_dark.png'

function Navbar({ user }) {
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const { colorMode, toggleColorMode } = useColorMode()
    const bg = useColorModeValue("gray.600", "gray.300");
    return (
        isMobile ? <Flex
            justifyContent={'space-between'}
            alignItems={'center'}
            p={4} >

            <Link to={'/dashboard'}>
                <Logo width={'150px'} srcLogo={colorMode !== 'light' ? logo : logoDark} />
            </Link>

            <SearchInput />
        </Flex>
            :
            <Flex
                justifyContent={'space-between'}
                alignItems={'center'}
                p={4}
            >

                <Link to={'/dashboard'}>
                    <Logo width={'180px'} srcLogo={colorMode !== 'light' ? logo : logoDark} />
                </Link>

                <SearchInput />

                <Setting colorMode={colorMode} actionToggleColorMode={toggleColorMode} bgCreateButton={bg} userImage={user?.photoURL} />
            </Flex>
    )
}

export default Navbar;