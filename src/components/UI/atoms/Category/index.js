import React from 'react'
import { Flex, Menu, Link, MenuButton, Text, Box, Tooltip, useMediaQuery } from '@chakra-ui/react';

function Category({ navSize, data, active, bg }) {
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    return (
        isMobile ? <Flex
            flexDir={'column'}
            w={'100%'}
            alignItems={navSize === 'small' ? 'center' : 'flex-start'}
        >
            <Menu>
                <Link
                    href={`/dashboard${data.path}`}
                    display={'flex'}
                    p={2}
                    backgroundColor={active && bg}
                    alignItems={'center'}
                    borderRadius={8}
                    _hover={bg === 'gray.600' ? { textDecor: 'none', backgroundColor: '#AEC8CA' } : { textDecor: 'none', backgroundColor: '#276749' }}
                >
                    <MenuButton
                        w={'100%'}
                    >
                        <Flex alignItems={'center'}>
                            <Tooltip bg={bg}>
                                <Box fontSize={'xl'} >
                                    {data.iconSrc}
                                </Box>
                            </Tooltip>
                            <Text ml={5} alignItems={'center'}>{data.name}</Text>

                        </Flex>
                    </MenuButton>
                </Link>

            </Menu>
        </Flex > :
            <Flex
                mt={30}
                flexDir={'column'}
                w={'100%'}
                alignItems={'flex-start'}
            >
                <Menu placement='right'>
                    <Link
                        href={`/dashboard${data.path}`}
                        display={'flex'}
                        p={3}
                        backgroundColor={active && bg}
                        alignItems={'center'}
                        borderRadius={8}
                        _hover={bg === 'gray.600' ? { textDecor: 'none', backgroundColor: '#AEC8CA' } : { textDecor: 'none', backgroundColor: '#276749' }}
                        w={navSize === 'large' && '100%'}
                    >
                        <MenuButton
                            w={'100%'}
                        >
                            <Flex alignItems={'center'} >
                                <Tooltip bg={bg}>
                                    <Box fontSize={'xl'} >
                                        {data.iconSrc}
                                    </Box>
                                </Tooltip>
                                <Text ml={5} transitionDuration={'0.5s'} alignItems={'center'} transitionProperty={'display'} display={navSize === 'small' ? 'none' : 'flex'}>{data.name}</Text>

                            </Flex>
                        </MenuButton>
                    </Link>

                </Menu>
            </Flex >
    )
}

export default Category;