import React, { useEffect } from 'react'
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { firebaseAuthentication, firebaseFireStore } from '../../../config/firebase/index.js';
import { doc, setDoc } from 'firebase/firestore';

import { Flex, HStack } from '@chakra-ui/react';
import { ButtonSignIn } from '../../../components/UI/atoms/Button';
import { useNavigate } from 'react-router';

import { fetchRefreshToken } from '../../../utils/fetchLogin.js';
const Login = () => {
    const firebaseAuth = firebaseAuthentication;
    const provider = new GoogleAuthProvider();
    const firebaseDb = firebaseFireStore;


    const navigate = useNavigate();

    useEffect(() => {
        const userRefreshToken = fetchRefreshToken();
        if (!userRefreshToken) {
            navigate('/login', { replace: true });
        } else {
            navigate('/dashboard', { replace: true });
        }
    }, []);

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