import React, { useState } from 'react'
import { FiMenu } from 'react-icons/fi';
import { useColorModeValue } from '@chakra-ui/color-mode';
import { Flex, IconButton, useMediaQuery } from '@chakra-ui/react';

import Category from '../../atoms/Category';

function Categories({ datas }) {
    const [navSize, changeNavSize] = useState("large");
    const [isMobile] = useMediaQuery("(max-width: 768px)");

    const bg = useColorModeValue("gray.600", "gray.300");


    return (

        isMobile ? <Flex
            left={'5'}
            boxShadow={'0 2px 8px 0 rgba(0, 0, 0, 0.05)'}
            w={'100%'}
            flexDir={'row'}
            justifyContent={'space-beetwen'}
        >

            <Flex
                overflow={'scroll'}
                p={'16px'}
                flexDir={'row'}
                gap={'16px'}
                alignItems={navSize === 'small' ? 'center' : "flex-start"}
                as="nav"
            >
                {datas && datas.map((data) => (
                    <Category key={data.id} navSize={navSize} data={data} bg={bg} />
                ))}
            </Flex>


        </Flex> :
            <Flex
                left={'5'}
                height={'95vh'}
                marginTop="2.5vh"
                boxShadow={'0 4px 12px 0 rgba(0, 0, 0, 0.05)'}
                pos={'sticky'}
                borderRadius={navSize === 'small' ? '15px' : '30px'}
                w={navSize === 'small' ? '7%' : '20%'}
                flexDir={'column'}
                transitionDuration={'0.5s'}
                transitionProperty={'width'}
                justifyContent={'space-beetwen'}
            >

                <Flex
                    p={'5%'}
                    flexDir={'column'}
                    alignItems={'flex-start'}
                    as="nav"
                >
                    <IconButton
                        ml={2}
                        background={'none'}
                        mt={5}
                        _hover={{ background: 'none' }}
                        icon={<FiMenu />}
                        onClick={() => {
                            if (navSize === "small") {
                                changeNavSize("large");

                            } else {
                                changeNavSize("small");
                            }
                        }}
                    />
                    {datas && datas.map((data) => (
                        <Category key={data.id} navSize={navSize} data={data} bg={bg} />
                    ))}
                </Flex>

            </Flex>
    )
}

export default Categories;