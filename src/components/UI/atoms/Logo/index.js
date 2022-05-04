import React from 'react'
import { Image } from '@chakra-ui/react';

function Logo({ srcLogo, width }) {

    return (
        <Image src={srcLogo} width={width} />
    )
}

export default Logo;