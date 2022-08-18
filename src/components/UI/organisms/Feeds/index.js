import React, { useEffect, useState } from 'react';
import { firebaseFireStore } from '../../../../config/firebase/';
import { fetchDataFeeds } from '../../../../utils/fetchData';

import { SimpleGrid, Flex } from '@chakra-ui/react';

import SpinnerLoad from '../../atoms/SpinnerLoad/';
import VideoItem from '../../molecules/VideoItem';

function Feeds() {
  const [feeds, setFeeds] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getFeed = () => {
      return new Promise((resolve, reject) => {
        resolve(
          fetchDataFeeds(firebaseFireStore)
            .then((feed) => feed)
            .then((data) => data)
        );
        reject('Error Cannot Get Data');
      });
    };
    setLoading(true);

    getFeed().then((data) => {
      setFeeds(data);
      setLoading(false);
    });
  }, []);

  return loading ? (
    <Flex
      justifyContent={'center'}
      alignItems={'center'}
      width={'full'}
      height={'70vh'}
    >
      <SpinnerLoad message={'Loading..'} />
    </Flex>
  ) : (
    <SimpleGrid
      spacing="16px"
      width={'full'}
      justifyContent={{ sm: 'center', md: 'start' }}
      columns={{ sm: 2, md: 3, lg: 4 }}
    >
      {feeds && feeds.map((data) => <VideoItem key={data.id} data={data} />)}
    </SimpleGrid>
  );
}

export default Feeds;
