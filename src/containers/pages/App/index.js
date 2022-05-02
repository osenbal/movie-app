import React from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import Login from '../Login/index.js';
import Home from '../Dashboard/index.js';

import './App.css';

const App = () => {
    return <Routes>
        <Route path='login' element={<Login />} />
        <Route path='/*' element={<Home />} />
    </Routes>
}

export default App;