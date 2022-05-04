import React from 'react';
import { Alert, AlertTitle } from '@chakra-ui/react';

function AlertMsg({ msg, icon, status }) {
    return (
        <Alert status={`${status ? status : 'info'}`}>
            {icon}
            <AlertTitle ml={10} >{msg}</AlertTitle>
        </Alert>
    )
}

export default AlertMsg;