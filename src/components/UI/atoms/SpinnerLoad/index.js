import React, { useEffect } from 'react';
import { Flex, Text, Progress } from '@chakra-ui/react';
import { Bars } from 'react-loader-spinner'

function SpinnerLoad({ message, progress }) {

    useEffect(() => {

    }, [progress])

    return (
        <Flex
            flexDirection={'column'}
            justifyContent={'center'}
            alignItems={'center'}
            height={'full'}
            px={10}
        >
            <Bars color={'#00BFFF'} height={80} width={80} />
            <Text fontSize={25} textAlign={'center'} px={2} >{message}</Text>

            {progress &&
                <Progress hasStripe value={Number.parseInt(progress)}
                    mt={50}
                    isAnimated
                    size={'sm'}
                    width={'lg'}
                    rounded={'small'}
                    colorScheme={'linkedin'}
                />
            }
        </Flex>
    )
}

export default SpinnerLoad;