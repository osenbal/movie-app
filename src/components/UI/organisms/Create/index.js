import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button, useColorMode } from '@chakra-ui/react';
import { IoWarning } from 'react-icons/io5';

import { categories } from '../../../../utils/data';

import { InputTitle, InputLocation, InputFileVideo } from '../../atoms/Form';
import { SelectionCategory } from '../../atoms/Selection';
import EditorText from '../../molecules/EditorText';
import AlertMsg from '../../atoms/AlertMsg';


import { fetchUserInfo } from '../../../../utils/fetchLogin';
import { firebaseFireStore } from '../../../../config/firebase';
import { doc, setDoc } from 'firebase/firestore';


function Create() {

    const [userInfo] = fetchUserInfo();
    const firebaseDb = firebaseFireStore;

    const { colorMode } = useColorMode();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState(false);
    const [alertStatus, setAlertStatus] = useState('');
    const [alertIcon, setAlertIcon] = useState(null);
    const [alertMsg, setAlertMsg] = useState('');
    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [category, setCategory] = useState('');
    const [videoAsset, setVideoAsset] = useState(null);
    const [description, setDescription] = useState('');

    const uploadDetail = async () => {
        try {
            setLoading(true);
            if (!title || !category || !videoAsset) {
                setAlert(true);
                setLoading(false);
                setAlertStatus('error');
                setAlertIcon(<IoWarning fontSize={25} />);
                setAlertMsg('There is field is required');
                setTimeout(() => {
                    setAlert(false);
                }, 3000);
            } else {
                const data = {
                    id: `${Date.now()}`,
                    title: title,
                    userId: userInfo?.uid,
                    category: category,
                    location: location,
                    videoUrl: videoAsset,
                    description: description,
                }

                await setDoc(doc(firebaseDb, 'videos', `${Date.now()}`), data);
                setLoading(false);
                navigate('/dashboard', { replace: true });

            }
        } catch (error) {
            console.log(error);
        }
    }
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
                pb={'20'}
                flexDir={'column'}
                alignItems={'center'}
                justifyContent={'center'}
                gap={2}
            >

                <InputTitle valueInput={setTitle} />

                <Flex
                    justifyContent={'space-between'}
                    width={'full'}
                    alignItems={'center'}
                    my={4}
                    flexWrap={'wrap'}
                    gap={'8px'}
                >
                    <SelectionCategory valueInput={setCategory} categories={categories} />

                    <InputLocation colorMode={colorMode} valueInput={setLocation} />

                </Flex>

                {/* File selection */}
                <InputFileVideo colorMode={colorMode} valVideoAsset={setVideoAsset} />

                <EditorText valueInput={setDescription} />

                {alert && (
                    <AlertMsg msg={alertMsg} status={alertStatus} icon={alertIcon} />
                )}
                <Button
                    colorScheme={'linkedin'}
                    isLoading={loading}
                    variant={`${loading ? 'outline' : 'solid'}`}
                    loadingText={'Uploading'}
                    width={'100%'}
                    _hover={{ shadow: 'lg' }}
                    fontSize={20}
                    onClick={() => uploadDetail()}
                >Upload</Button>
            </Flex>

        </Flex >
    )
}

export default Create;