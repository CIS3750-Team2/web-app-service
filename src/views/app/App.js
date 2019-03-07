import React from 'react';
import {Redirect, Route, Switch} from 'react-router-dom';

import {Layout} from 'antd';
import AboutView from 'views/about';
import DataView from 'views/data';
import VisualizeView from 'views/visualize';
import AppHeader from './Header';
import AppFooter from './Footer';

import './App.scss';

const App = () => (
    <Layout id='app-layout'>
        <Layout.Header>
            <AppHeader/>
        </Layout.Header>

        <Layout.Content>
            <Switch>
                <Route path="/about" exact component={AboutView}/>
                <Route path="/data" exact component={DataView}/>
                <Route path="/visualize" exact component={VisualizeView}/>
                { /* more routes go here */ }
                <Redirect to="/about"/>
            </Switch>
        </Layout.Content>

        <Layout.Footer>
            <AppFooter/>
        </Layout.Footer>
        </Layout>
);

export default App;
