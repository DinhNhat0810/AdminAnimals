import React from 'react';
import ReactDOM from 'react-dom';
import 'assets/css/App.css';
import { ChakraProvider } from '@chakra-ui/react';
import theme from 'theme/theme';
import App from 'App';
import { Provider } from 'react-redux';
import store from 'app/store';

ReactDOM.render(
    <Provider store={store}>
        <ChakraProvider theme={theme}>
            <React.StrictMode>
                <App />
            </React.StrictMode>
        </ChakraProvider>
    </Provider>,
    document.getElementById('root'),
);
