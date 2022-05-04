import React from 'react'
import { Button, Flex } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { IoAdd } from 'react-icons/io5'

function ButtonSignIn(props) {
    return (
        <Button leftIcon={<FcGoogle fontSize={25} />} colorScheme='google' color={'blackAlpha.700'} shadow={'lg'} onClick={props.login}>
            Signin With Google
        </Button>
    )
}

function ButtonMyProfile() {
    return
}

function CreateButton({ colorMode, bg }) {
    return (

        <Flex
            justifyContent={'center'}
            alignItems={'center'}
            bg={bg}
            width={'40px'}
            height={'40px'}
            borderRadius={'5px'}
            mx={'6'}
            cursor={'pointer'}
            _hover={{ shadow: 'md' }}
            transition={'ease-in-out'}
            transitionDuration={'0.3s'}>

            <IoAdd fontSize={25} color={colorMode} />

        </Flex>
    )
}

export {
    ButtonSignIn,
    ButtonMyProfile,
    CreateButton
};