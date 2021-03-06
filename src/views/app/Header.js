import React from 'react';
import {withRouter} from 'react-router-dom';

import {Menu} from 'antd';

import logo from 'sundial_logo.png';

const Header = withRouter(({location, history}) => (
    <>
        <div className='logo' onClick={() => history.push('/about')}>
            <img src={logo}/>
        </div>
        <Menu
            onClick={({key}) => history.push(`/${key}`)}
            mode='horizontal'
            theme='dark'
            selectedKeys={[location.pathname.slice(1)]}
            className='app-menu'
        >
            <Menu.Item key='about'>
                About
            </Menu.Item>
            <Menu.Item key='data'>
                Data
            </Menu.Item>
            <Menu.Item key='visualize'>
                Visualize
            </Menu.Item>
        </Menu>
    </>
));

export default Header;
