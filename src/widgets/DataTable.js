import React from 'react';
import _ from 'lodash';

import {Table} from 'antd';

const columns = {
    'firstName': 'First Name',
    'lastName': 'Last Name',
    'salary': 'Salary',
    'industry': 'Industry'
};
const columnKeys = _.keys(columns);

const getTableColumns = (data) => (
    _.chain(data)
        .map((row) => _.keys(row))
        .flatten()
        .uniq()
        .without('id')
        .sortBy()
        .sortBy((dataIndex) => columns[dataIndex]
            ? columnKeys.indexOf(dataIndex)
            : columnKeys.length
        )
        .map((dataIndex) => ({
            title: columns[dataIndex] || dataIndex,
            dataIndex,
            sortDirections: ['descend', 'ascend'],
            sorter: (a, b) => a[dataIndex] > b[dataIndex] ? 1 : -1
        }))
        .value()
);

const DataTable = ({ data, ...props }) => (
    <div {...props}>
        <Table
            dataSource={data}
            bordered={true}
            columns={getTableColumns(data)}
            rowKey='id'
            size='middle'
        />
    </div>
);

export default DataTable;
