import React, {useState, useEffect} from 'react';
import _ from 'lodash';

import API from 'core/api';
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

const DataTable = ({ filter, search = '', ...props }) => {
    const [data, setData] = useState([]);

    useEffect(() => {
        API.loadData({ filter, search }).then((res) => {
            if (!_.isEqual(data, res)) setData(res);
        })
    });

    return (
        <div {...props}>
            <Table
                dataSource={data}
                bordered={true}
                columns={getColumnData(data)}
                rowKey='_id'
                size='middle'
            />
        </div>
    );
};

export default DataTable;
