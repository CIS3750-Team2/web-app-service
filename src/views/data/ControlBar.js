import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import timeout from 'util/timeout';

import {
    getTableSearch,
    setTableSearch
} from 'core/reducer';

import {useModals} from 'util/ModalProvider';
import FilterDataModal from './FilterDataModal';
import {message, Input, Button, Menu, Dropdown, Icon} from 'antd';

import './ControlBar.scss';

// TODO: Pass data here...
const exportCsv = async (data) => {
    const hide = message.loading('Preparing export...');

    // generate export
    const csvString = `
col1,col2
val11,val12
val21,val22`;
    await timeout(1000);

    const element = document.createElement('a');
    element.href = URL.createObjectURL(
        new Blob([csvString]),
        { type: 'application/csv' }
    );
    element.download = 'export.csv';
    element.click();

    hide();
    message.success('Export ready. Downloading...');
};

const ControlBar = useModals(connect(
    (state) => ({
        search: getTableSearch(state)
    }),
    (dispatch) => bindActionCreators({
        setSearch: setTableSearch
    }, dispatch)
)(({ search, setSearch, openModal }) => (
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
            onClick={() => openModal(<FilterDataModal/>)}
        >
            Filter...
        </Button>
        <Dropdown overlay={
            <Menu
                onClick={({ key }) => exportCsv(key === 'filter' ? [] /* table data */ : [] /* raw data */)}
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
                <Icon type="down"/>
            </Button>
        </Dropdown>
    </div>
)));

export default ControlBar;
