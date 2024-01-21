import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import App from 'App';
import { Provider } from 'react-redux';
import store from 'app/store';

ReactDOM.render(
    <ChakraProvider theme={theme}>
        <Provider store={store}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </Provider>
    </ChakraProvider>,
    document.getElementById('root'),
);
