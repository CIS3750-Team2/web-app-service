import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Redirect, Route, Switch} from 'react-router-dom';

import {getRawData, loadData} from 'core/reducer';

import {Layout} from 'antd';
import AboutView from 'views/about';
import DataView from 'views/data';
import VisualizeView from 'views/visualize';
import AppHeader from './Header';
import AppFooter from './Footer';

import './App.scss';

const App = connect(
    (state) => ({
        rawData: getRawData(state)
    }),
    (dispatch) => bindActionCreators({
        loadData
    }, dispatch)
)(({ rawData, loadData }) => {
    useEffect(() => {
        // TODO: Uncomment this
        // if (rawData.length === 0) {
        //     loadData();
        // }
    });

    return (
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
});

export default App;
