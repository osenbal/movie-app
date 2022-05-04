import React from 'react'

import { InputGroup, InputLeftElement, Input } from '@chakra-ui/react';
import { IoSearch } from 'react-icons/io5';

function SearchInput() {
    return (
        <InputGroup mx={[2, 4, 6]} width={[
            '100vw', // 0-30em
            '60vw', // 48em-62em
        ]}>
            <InputLeftElement
                pointerEvents='none'
                children={<IoSearch fontSize={25} />}
            />
            <Input type='text' placeholder='Search...' fontSize={18} fontWeight={'medium'} variant={'filled'} />
        </InputGroup>
    )
}

export default SearchInput