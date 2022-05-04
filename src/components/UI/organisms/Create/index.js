import React from 'react';
import { Flex, useColorMode } from '@chakra-ui/react';

import { categories } from '../../../../utils/data';

import { InputTitle, InputLocation, InputFileVideo } from '../../atoms/Form';
import { SelectionCategory } from '../../atoms/Selection';

function Create() {

    const { colorMode } = useColorMode()

    return (
        <Flex
            justifyContent={'center'}
            alignItems={'center'}
            width={'full'}
            minHeight={'100vh'}
            height={'full'}
            padding={4}

        >
            <Flex
                width={'90%'}
                height={'full'}
                border={'1px'}
                borderColor={'gray.300'}
                borderRadius={'md'}
                p={'4'}
                flexDir={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={2}
            >
                <InputTitle />

                <Flex
                    justifyContent={'space-between'}
                    width={'full'}
                    alignItems={'center'}
                    my={4}
                    flexWrap={'wrap'}
                    gap={'8px'}
                >
                    <SelectionCategory categories={categories} />
                    <InputLocation colorMode={colorMode} />

                </Flex>

                {/* File selection */}
                <InputFileVideo colorMode={colorMode} />


            </Flex>

        </Flex >
    )
}

export default Create;