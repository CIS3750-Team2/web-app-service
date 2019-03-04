import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';

import App from 'ui/App';

const routes = (
    <Router>
        <Switch>
            <Route path="/" exact component={App}/>
            { /* more routes go here */ }
            <Redirect to="/"/>
        </Switch>
    </Router>
);

export default routes;
