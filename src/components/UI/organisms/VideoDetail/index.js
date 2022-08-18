import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import parse from 'html-react-parser';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { IoHome, IoPlay, IoTrash } from 'react-icons/io5';
import SpinnerLoad from '../../atoms/SpinnerLoad';
import {
  getSpesificVideo,
  getUserInfo,
  deleteVideo,
} from '../../../../utils/fetchData';
import { firebaseFireStore } from '../../../../config/firebase';
import { FcApproval } from 'react-icons/fc';
import moment from 'moment';
import { fetchUserInfo } from '../../../../utils/fetchLogin';
import {
  Flex,
  Box,
  Text,
  Grid,
  GridItem,
  Image,
  useColorModeValue,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton,
  ButtonGroup,
  Button,
} from '@chakra-ui/react';

const avatar =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

function VideoDetail() {
  const textColor = useColorModeValue('gray.900', 'gray.50');
  const { videoId } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [videoInfo, setvideoInfo] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [localUser] = fetchUserInfo();
  const navigate = useNavigate();
  const deleteTheVideo = async (videoId) => {
    setIsLoading(true);
    await deleteVideo(firebaseFireStore, videoId);
    navigate('/dashboard', { replace: true });
  };

  useEffect(() => {
    if (videoId) {
      setIsLoading(true);
      getSpesificVideo(firebaseFireStore, videoId).then((data) => {
        setvideoInfo(data);
        getUserInfo(firebaseFireStore, data.userId)
          .then((user) => {
            setUserInfo(user);
            console.log(user);
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }

    setIsLoading(false);
  }, [videoId]);

  if (isLoading) {
    return (
      <Flex
        justifyContent={'center'}
        width={'full'}
        alignItems={'center'}
        height={'100vh'}
      >
        <SpinnerLoad />
      </Flex>
    );
  }
  return (
    <Flex
      width={'full'}
      height={'auto'}
      justifyContent={'center'}
      alignItems={'center'}
      direction={'column'}
      py={[0, 2]}
    >
      <Flex alignItems={'center'} width={'full'} my={[2, 4]} px={2}>
        <Link to={'/dashboard'}>
          <IoHome fontSize={25} />
        </Link>
        <Box width={'1px'} height={'25px'} bg={'gray.500'} mx={2}></Box>
        <Text
          isTruncated
          color={textColor}
          fontWeight={'semibold'}
          width={'100%'}
        >
          {videoInfo?.title}
        </Text>
      </Flex>

      <Grid
        gridTemplateColumns={{ base: 'repeat(1, 1fr)', md: 'repeat(3, 1fr)' }}
        gap={4}
        width={'100%'}
      >
        <GridItem
          width={'100%'}
          height={{ base: '210px', md: '300px', lg: '400px', xl: '600px' }}
          colSpan={'2'}
        >
          <Flex
            width={'full'}
            height={'100%'}
            bg={'black'}
            position={'relative'}
          >
            <ReactPlayer
              url={videoInfo?.videoUrl}
              width={'100%'}
              height={'100%'}
              controls
              playIcon={<IoPlay />}
              playing
            />
          </Flex>
        </GridItem>
        <GridItem width={'100%'} colSpan={'1'} p={2}>
          {userInfo && (
            <Flex direction={'column'} width={'full'}>
              <Flex alignItems={'center'} width={'full'}>
                <Image
                  src={userInfo?.photoURL ? userInfo?.photoURL : avatar}
                  rounded={'full'}
                  width={'48px'}
                  height={'48px'}
                />

                <Flex direction={'column'} ml={3}>
                  <Flex alignItems={'start'} gap={1}>
                    <Text isTruncated color={textColor} fontWeight={'semibold'}>
                      {userInfo?.displayName}
                    </Text>
                    <FcApproval />
                  </Flex>

                  {videoInfo?.id && (
                    <Text fontSize={12}>
                      {moment(
                        new Date(parseInt(videoInfo.id)).toISOString()
                      ).fromNow()}
                    </Text>
                  )}
                </Flex>
              </Flex>

              {/* Action button */}
              <Flex justifyContent={'space-around'} mt={6}>
                {localUser?.uid === userInfo?.uid && (
                  <Popover closeOnEsc>
                    <PopoverTrigger>
                      <Button colorScheme={'red'}>
                        <IoTrash fontSize={20} />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent>
                      <PopoverArrow />
                      <PopoverCloseButton />
                      <PopoverHeader>Confirmation!</PopoverHeader>
                      <PopoverBody>
                        Are you sure <b style={{ color: 'red' }}>delete</b> this
                        video ?
                      </PopoverBody>
                      <PopoverFooter display="flex" justifyContent="flex-end">
                        <ButtonGroup size="sm">
                          <Button
                            colorScheme="red"
                            onClick={() => deleteTheVideo(videoId)}
                          >
                            Yes
                          </Button>
                        </ButtonGroup>
                      </PopoverFooter>
                    </PopoverContent>
                  </Popover>
                )}

                <a
                  href={videoInfo?.videoUrl}
                  download
                  rel="noreferrer"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Button
                    colorScheme={'whatsapp'}
                    rounded={'full'}
                    my={2}
                    mt={'0'}
                  >
                    Download
                  </Button>
                </a>
              </Flex>
            </Flex>
          )}
        </GridItem>

        <GridItem width={'100%'} colSpan={'2'} p={2}>
          {videoInfo?.description && (
            <Flex my={5} direction={'column'} width={'full'} px={[3, 3, 0, 0]}>
              <Text
                my={2}
                fontSize={25}
                fontWeight={'semibold'}
                textAlign={'left'}
              >
                Description
              </Text>
              {parse(videoInfo?.description)}
            </Flex>
          )}
        </GridItem>
      </Grid>
    </Flex>
  );
}

export default VideoDetail;
