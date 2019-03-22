import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import timeout from 'util/timeout';
import _ from 'lodash';

import {
    getTableSearch,
    setTableSearch,
    getTableFilter,
} from 'core/reducer';

import API from 'core/api';

import { useModals } from 'util/ModalProvider';
import FilterDataModal from './FilterDataModal';
import { message, Input, Button, Menu, Dropdown, Icon } from 'antd';

import './ControlBar.scss';

// TODO: Pass data here...
const exportCSV = async (filter, search, dataIsFiltered) => {
    const hide = message.loading('Preparing export...');
    // go to new page with url as query
    if (dataIsFiltered) {
        const tableQuery = { filter: filter, search: search }
        window.open(await API.exportFilteredCSV(tableQuery), '_blank');
    } else {
        window.open(await API.exportAllCSV(), '_blank');
    }
    hide();
    message.success('Export ready. Downloading...');
};

const ControlBar = useModals(connect(
    (state) => ({
        search: getTableSearch(state),
        filter: getTableFilter(state),
    }),
    (dispatch) => bindActionCreators({
        setSearch: setTableSearch
    }, dispatch)
)(({ filter, search, setSearch, openModal }) => (
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
                onClick={({ key }) => exportCSV(filter, search, key === 'filter')}
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
