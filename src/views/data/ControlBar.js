import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import timeout from 'util/timeout';

import {
    getTableSearch,
    getTableData,
    getRawData,
    setTableSearch
} from 'core/reducer';

import {message, Input, Button, Menu, Dropdown, Icon} from 'antd';

import './ControlBar.scss';

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

const ControlBar = connect(
    (state) => ({
        search: getTableSearch(state),
        tableData: getTableData(state),
        rawData: getRawData(state)
    }),
    (dispatch) => bindActionCreators({
        setSearch: setTableSearch
    }, dispatch)
)(({ search, tableData, rawData, setSearch }) => (
    <div className='control-bar'>
        <Input
            placeholder='Quick search'
            className='quick-search'
            allowClear={true}
            value={search}
            onChange={({ target: { value } }) => setSearch(value)}
        />

        <Button type='primary'>
            Filter...
        </Button>
        <Dropdown overlay={
            <Menu
                onClick={({ key }) => exportCsv(key === 'filter' ? tableData : rawData)}
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
));

export default ControlBar;
