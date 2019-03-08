import React from 'react';
import {Provider as ReduxProvider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {render} from 'react-dom';

import App from 'views/app';
import ModalProvider from 'util/ModalProvider';
import store from 'core/store';

import 'index.scss';

window.getState = store.getState;
window.getStore = () => store;

render(
    <ReduxProvider store={store}>
        <ModalProvider>
            <Router>
                <App/>
            </Router>
        </ModalProvider>
    </ReduxProvider>,
    document.getElementById('root')
);
