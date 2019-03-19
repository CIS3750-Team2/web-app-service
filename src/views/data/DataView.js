import React from 'react';
import {connect} from 'react-redux';

import {getTableFilter, getTableSearch} from 'core/reducer';

import {Card} from 'antd';
import ControlBar from './ControlBar';
import DataTable from 'widgets/DataTable';

import './DataView.scss';

const DataView = connect(
    (state) => ({
        filter: getTableFilter(state),
        search: getTableSearch(state)
    })
)(({ filter, search }) => (
    <div className='data-view'>
        <Card>
            <ControlBar/>
            <DataTable filter={filter} search={search}/>
        </Card>
    </div>
));

export default DataView;
