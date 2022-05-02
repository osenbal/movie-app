import React from 'react'
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseApp } from '../../../config/firebase/index.js';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

import { Flex, HStack } from '@chakra-ui/react';
import { ButtonSignIn } from '../../../components/UI/atoms/Button';
import { useNavigate } from 'react-router';


const Login = () => {
    const firebaseAuth = getAuth(firebaseApp);
    const provider = new GoogleAuthProvider();
    const firebaseDb = getFirestore(firebaseApp);


    const navigate = useNavigate();



    const loginHandle = async () => {
        const { user } = await signInWithPopup(firebaseAuth, provider);
        const { refreshToken, providerData } = user;

        localStorage.setItem('user', JSON.stringify(providerData));
        localStorage.setItem('refreshToken', JSON.stringify(refreshToken));

        await setDoc(doc(firebaseDb, 'users', providerData[0].uid), providerData[0]);

        navigate('/dashboard', { replace: true })
    };



    return (
        <Flex
            justifyContent={'center'}
            alignItems={'center'}
            width={'100%'}
            height={'100vh'}
            position={'relative'}
        >
            <HStack>
                <ButtonSignIn login={() => loginHandle()} />
            </HStack>
        </Flex>
    )
}

export default Login;