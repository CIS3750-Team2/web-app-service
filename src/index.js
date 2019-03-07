import React from 'react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {render} from 'react-dom';

import App from 'views/app';
import store from 'core/store';

import 'index.scss';

window.getState = store.getState;
window.getStore = () => store;

render(
    <Provider store={store}>
        <Router>
            <App/>
        </Router>
    </Provider>,
    document.getElementById('root')
);
