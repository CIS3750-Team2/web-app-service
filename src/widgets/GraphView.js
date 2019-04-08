import React from 'react';

import {Divider} from 'antd';
import Graph from 'widgets/Graph';
import DataTable from 'widgets/DataTable';

import './GraphView.scss';

const GraphView = (graph) => (
    <div className='graph-view'>
        <Graph {...graph} large={true}/>

        <Divider orientation='left'>
            Data
        </Divider>
        <DataTable
            filter={graph.filter}
            pageSizeOptions={['5', '10', '15']}
            defaultPageSize={5}
            tableProps={{
                size: 'small',
                scroll: { x: true },
                bordered: false
            }}
        />
    </div>
);

export default GraphView;
