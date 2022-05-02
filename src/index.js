import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './containers/pages/App/index.js';
import './index.css';

import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript } from '@chakra-ui/react';
import { theme } from './config/chakraui/index.js';

const root = createRoot(document.getElementById('root'));
root.render(
    <ChakraProvider>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <Router>
            <App />
        </Router>
    </ChakraProvider>
);