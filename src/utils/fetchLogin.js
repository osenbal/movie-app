export const fetchRefreshToken = () => {
    return localStorage.getItem('refreshToken') !== 'undefined' ? JSON.parse(localStorage.getItem('refreshToken')) : localStorage.clear();
}

export const fetchUserInfo = () => {
    return localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
}