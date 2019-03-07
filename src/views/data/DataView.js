import React from 'react';
import {connect} from 'react-redux';

import {getTableData} from 'core/reducer';

import {Card} from 'antd';
import ControlBar from './ControlBar';
import DataTable from 'widgets/DataTable';

import './DataView.scss';

const DataView = connect(
    (state) => ({ data: getTableData(state) })
)(({ data }) => (
    <div className='data-view'>
        <Card>
            <ControlBar/>
            <DataTable data={data}/>
        </Card>
    </div>
));

export default DataView;
