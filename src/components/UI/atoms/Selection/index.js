import React, { useState } from 'react'
import { Menu, MenuButton, MenuList, MenuItem, Text, Button } from '@chakra-ui/react';
import { IoChevronDown } from 'react-icons/io5';



function SelectionCategory({ categories }) {
    const [category, setCategory] = useState('Select Category');

    return (
        <Menu>
            <MenuButton width={[
                '100%',
                '45%'
            ]} colorScheme={'blue'} as={Button} rightIcon={<IoChevronDown />}>
                {category}
            </MenuButton>
            <MenuList zIndex={101} shadow={'x1'}>
                {categories && categories.map((data) => (
                    <MenuItem
                        key={data.id}
                        _hover={{ bg: 'blackAlpha.300' }}
                        fontSize={20}
                        px={4}
                        onClick={() => setCategory(data.name)}
                    >
                        {data.iconSrc} <Text fontSize={18} ml={4}>{data.name}</Text>
                    </MenuItem>
                ))}
            </MenuList>
        </Menu>
    )
}

export { SelectionCategory }