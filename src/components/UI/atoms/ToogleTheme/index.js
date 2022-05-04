import React from 'react'
import { Flex } from '@chakra-ui/layout';
import { IoMoon, IoSunny } from 'react-icons/io5';
function ToogleTheme({ colorMode, action }) {

    return (
        <Flex
            width={'40px'}
            height={'40px'}
            justifyContent={'center'}
            alignItems={'center'}
            cursor={'pointer'}
            borderRadius={'5px'}
            onClick={action}
        >
            {colorMode === 'light' ? <IoMoon fontSize={25} /> : <IoSunny fontSize={25} />}
        </Flex>
    )
}

export default ToogleTheme;