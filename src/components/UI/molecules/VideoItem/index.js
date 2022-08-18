/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { Flex, Text, Image, useColorModeValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { getUserInfo } from '../../../../utils/fetchData';
import { firebaseFireStore } from '../../../../config/firebase/';
import moment from 'moment';

const avatar =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

function VideoItem({ data }) {
  const bg = useColorModeValue('blackAlpha.700', 'gray.900');
  const textColor = useColorModeValue('gray.100', 'gray.100');

  const [userInfo, setUserInfo] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    if (data) setUserId(data.userId);
    if (userId)
      getUserInfo(firebaseFireStore, userId).then((data) => {
        setUserInfo(data);
      });
  }, [userId]);

  return (
    <Flex
      justifyContent={'flex-start'}
      alignItems={'center'}
      direction={'column'}
      position={'relative'}
      cursor={'pointer'}
      shadow={'sm'}
      overflow={'hidden'}
      _hover={{ shadow: 'md' }}
    >
      <Link
        to={`/dashboard/videoDetail/${data.id}`}
        style={{
          backgroundColor: '#000',
          height: '160px',
          width: '100%',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <video
          src={data.videoUrl}
          style={{ width: '100%', height: '160px' }}
          muted
          onMouseOver={(e) => e.target.play()}
          onMouseOut={(e) => e.target.pause()}
        />
      </Link>

      <Flex
        position={'absolute'}
        bottom={'0'}
        left={'0'}
        p={2}
        bg={bg}
        width={'full'}
        direction={'column'}
      >
        <Flex
          width={'full'}
          direction={'row'}
          justifyContent={'space-between'}
          alignItems={'center'}
        >
          <Text color={textColor} isTruncated fontSize={20}>
            {data.title}
          </Text>
          <Link to={`/dashboard/user/id-${data.userId}`}>
            <Image
              src={userInfo?.photoURL ? userInfo?.photoURL : avatar}
              rounded={'full'}
              width={'40px'}
              height={'40px'}
              borderColor={bg}
              mt={-10}
            />
          </Link>
        </Flex>
        <Text fontSize={12} color={textColor} ml={'auto'}>
          {moment(new Date(parseInt(data.id)).toISOString()).fromNow()}
        </Text>
      </Flex>
    </Flex>
  );
}

export default VideoItem;
