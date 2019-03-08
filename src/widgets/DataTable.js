import React from 'react';
import _ from 'lodash';

import {getTableColumns} from 'util/columns';

import {Table} from 'antd';

const getColumnData = (data) => _.map(
    getTableColumns(data),
    ({ id, label }) => ({
        title: label,
        dataIndex: id,
        sortDirections: ['descend', 'ascend'],
        sorter: (a, b) => a[id] > b[id] ? 1 : -1
    })
);

const DataTable = ({ data, ...props }) => (
    <div {...props}>
        <Table
            dataSource={data}
            bordered={true}
            columns={getColumnData(data)}
            rowKey='id'
            size='middle'
        />
    </div>
);

export default DataTable;
