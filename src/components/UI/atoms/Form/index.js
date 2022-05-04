import React, { useState, useEffect } from 'react';
import { Input, InputGroup, InputLeftElement, Flex, FormLabel, Text, useColorModeValue } from '@chakra-ui/react';
import { IoLocation, IoCloudUpload, IoTrash } from 'react-icons/io5';


// firebase storage
import { firebaseApp } from '../../../../config/firebase/';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage';


import SpinnerLoad from '../SpinnerLoad';

function InputTitle() {

    const [title, setTitle] = useState('');

    return (
        <Input
            variant={'flushed'}
            placeholder={'Title'}
            focusBorderColor={'gray.400'}
            isRequired
            errorBorderColor={'red'}
            type={'text'}
            _placeholder={{ color: 'gray.500' }}
            fontSize={20}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
        />
    )
}

function InputLocation({ colorMode }) {

    const [location, setLocation] = useState('');

    return (
        <InputGroup width={[
            '100%',
            '45%'
        ]} >
            <InputLeftElement
                pointerEvents='none'
                children={<IoLocation color={`${colorMode === 'dark' ? '#f1f1f1' : '#111'}`} fontSize={20} />}
            />
            <Input placeholder='Location'
                variant={'flushed'}
                focusBorderColor={'gray.400'}
                isRequired
                errorBorderColor={'red'}
                type={'text'}
                _placeholder={{ color: 'gray.500' }}
                fontSize={20}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
        </InputGroup>

    )
}

function InputFileVideo({ colorMode }) {

    const [videoAsset, setVideoAsset] = useState(null);
    const [loading, setLoading] = useState(false);
    const [progress, setProgress] = useState(0);

    const textColor = useColorModeValue("gray.900", "gray.50");


    const storage = getStorage(firebaseApp);

    const uploadVideo = (event) => {
        setLoading(true);
        const videoFile = event.target.files[0];

        const storageRef = ref(storage, `Videos/${Date.now()}-${videoFile.name}`);

        const uploadTask = uploadBytesResumable(storageRef, videoFile);

        uploadTask.on('state_changed', (snapshot) => {
            const uploadProgress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            setProgress(uploadProgress);
        }, (error) => {
            console.log(error);
        }, () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setVideoAsset(downloadURL);
                setLoading(false);
            });
        })

    }

    const deleteVideo = () => {
        const deleteRef = ref(storage, videoAsset);
        deleteObject(deleteRef).then(() => {
            setVideoAsset(null);

        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {

    }, [videoAsset])

    return (
        <Flex
            border={'1px'}
            borderColor={'gray.500'}
            height={'400px'}
            width={'full'}
            borderRadius={'md'}
            overflow={'hidden'}
            position={'relative'}

        >
            {!videoAsset ? (
                <FormLabel width={'full'}>
                    <Flex direction={'column'}
                        alignItems={'center'}
                        justifyContent={'center'}
                        height={'full'}
                        width={'full'}
                        cursor={'pointer'}
                    >
                        {loading ? (
                            <SpinnerLoad message={'Uploding Your Video'} progress={progress} />
                        ) : (
                            <>
                                <IoCloudUpload
                                    fontSize={30}
                                    color={`${colorMode === 'dark' ? '#f1f1f1' : '#111'}`}
                                />
                                <Text mt={'5'} fontSize={20} color={textColor}>
                                    Click To Upload
                                </Text>
                            </>
                        )}
                    </Flex>

                    {!loading && (
                        <Input type={'file'}
                            name={'upload-video'}
                            onChange={uploadVideo}
                            style={{ width: '0', height: '0' }}
                            opacity={'0'}
                            accept={'video/mp4,video/x-m4v,video/*'}
                        />
                    )}
                </FormLabel>
            ) : (
                <Flex
                    justifyContent={'center'}
                    alignItems={'center'}
                    width={'full'}
                    height={'full'}
                    bg={'black'}
                    position={'relative'}
                >
                    <Flex
                        justifyContent={'center'}
                        alignItems={'center'}
                        width={'40px'}
                        height={'40px'}
                        rounded={'full'}
                        bg={'red'}
                        top={5}
                        right={5}
                        position={'absolute'}
                        cursor={'pointer'}
                        zIndex={10}
                        onClick={deleteVideo}
                    >
                        <IoTrash fontSize={20} color={'white'} />
                    </Flex>

                    <video
                        src={videoAsset}
                        controls
                        style={{ width: '100%', height: '100%' }}
                    />

                </Flex>
            )}
        </Flex>

    )
}

export { InputTitle, InputLocation, InputFileVideo };