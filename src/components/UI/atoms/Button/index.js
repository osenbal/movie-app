import React from 'react'
import { Button } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';

function ButtonSignIn(props) {
    return (
        <Button leftIcon={<FcGoogle fontSize={25} />} colorScheme='google' color={'blackAlpha.700'} shadow={'lg'} onClick={props.login}>
            Signin With Google
        </Button>
    )
}

export {
    ButtonSignIn
};