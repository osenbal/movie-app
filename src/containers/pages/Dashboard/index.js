import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router';
import { fetchRefreshToken, fetchUserInfo } from '../../../utils/fetchLogin.js';

const Dashboard = () => {
    const [user, setUser] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        const userRefreshToken = fetchRefreshToken();

        if (!userRefreshToken) {
            navigate('/login', { replace: true });
        } else {
            const [userInfo] = fetchUserInfo();
            setUser(userInfo);
        }
    }, []);


    return (
        <div>Dashboard</div>
    )
}

export default Dashboard;
