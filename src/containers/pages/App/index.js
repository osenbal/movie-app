import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Home from '../Home/index.js';
import Login from '../Login/index.js';
import Dashboard from '../Dashboard/index.js';

import './App.css';

const App = () => {


    return <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
    </Routes>
}

export default App;