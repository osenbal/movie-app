import React from 'react'
import { Link } from 'react-router-dom';
import { Flex } from '@chakra-ui/layout';

import ToogleTheme from '../../atoms/ToogleTheme';
import { CreateButton } from '../../atoms/Button';
import MenuUser from '../../atoms/MenuUser';

function Setting({ colorMode, actionToggleColorMode, bgCreateButton, userImage }) {
    return (
        <Flex
            justifyContent={'space-around'}
            alignItems={'center'}
        >

            <ToogleTheme colorMode={colorMode} action={actionToggleColorMode} />

            <Link to={'/dashboard/create'}>
                <CreateButton colorMode={`${colorMode === 'dark' ? '#111' : '#f1f1f1'}`} bg={bgCreateButton} />
            </Link>

            <MenuUser photoURL={userImage} />

        </Flex>
    )
}

export default Setting;