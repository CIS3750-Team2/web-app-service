import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import timeout from 'util/timeout';
import _ from 'lodash';

import {
    getTableSearch,
    setTableSearch,
    getTableFilter,
} from 'core/reducer';

import API from 'core/api';

import {useModals} from 'util/ModalProvider';
import FilterDataModal from './FilterDataModal';
import {message, Input, Button, Menu, Dropdown, Icon} from 'antd';

import './ControlBar.scss';

// TODO: Pass data here...
const exportCSV = async (filter, search) => {
    let query;
    if (filter || search) {
        query = { filter, search };
    }
    // go to new page with url as query
    window.open(API.getExportUrl(query), '_blank');
};

const ControlBar = useModals(connect(
    (state) => ({
        search: getTableSearch(state),
        filter: getTableFilter(state),
    }),
    (dispatch) => bindActionCreators({
        setSearch: setTableSearch
    }, dispatch)
)(({filter, search, setSearch, openModal}) => (
    <div className='control-bar'>
        <Input
            placeholder='Quick search'
            className='quick-search'
            allowClear={true}
            value={search}
            onChange={({ target: { value } }) => setSearch(value)}
        />

        <Button
            type='primary'
            icon='tool'
            onClick={() => openModal(<FilterDataModal />)}
        >
            Filter...
        </Button>
        <Dropdown overlay={
            <Menu
                onClick={({key}) => key === 'filter' ? exportCSV(filter, search) : exportCSV()}
            >
                <Menu.Item key='filter'>Export with filters</Menu.Item>
                <Menu.Item key='all'>Export all data</Menu.Item>
            </Menu>
        }>
            <Button
                type='primary'
                icon='download'
            >
                Export CSV
                <Icon type="down" />
            </Button>
        </Dropdown>
    </div>
)));

export default ControlBar;
