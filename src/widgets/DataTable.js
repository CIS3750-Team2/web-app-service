import React, { useState, useEffect } from 'react';
import _ from 'lodash';

import API from 'core/api';
import { getTableColumns } from 'util/columns';

import { Table, Modal } from 'antd';

const getColumnData = (data) => _.map(
    getTableColumns(data),
    ({ id, label }) => ({
        title: label,
        dataIndex: id,
        sortDirections: ['descend', 'ascend'],
        sorter: true
    })
);

const DataTable = ({ filter, search = '', ...props }) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [pageData, setPageData] = useState({ start: 0, limit: 10 });
    const [sortData, setSortData] = useState({});

    const pagination = {
        pageSize: pageData.limit,
        current: Math.floor(pageData.start / pageData.limit) + 1,
        pageSizeOptions: ['10', '25', '50', '100'],
        showSizeChanger: true,
        total: Math.min(count, 1000)
    };

    useEffect(() => {
        setLoading(true);
        const query = {
            ...pageData,
            sortField: sortData.field,
            sortOrder: sortData.order && `${sortData.order}ing`,
            filter,
            search
        };

        Promise.all([
            API.loadData(query),
            API.loadCount(query)
        ]).then((res) => {
            if (count !== res[1] || !_.isEqual(data, res[0])) {
                setData(res[0]);
                setCount(res[1]);
            }
        }).catch((err) => {
            console.warn(err);
            Modal.error({
                content: 'Error while loading, please retry!'
            });
        }).finally(() => {
            setLoading(false);
        });
    }, [filter, search, pageData, sortData]);

    const onChange = ({ current, pageSize }, filters, { field, order }) => {
        if (pagination.current !== current || pagination.pageSize !== pageSize) {
            setPageData({
                limit: pageSize,
                start: (current - 1) * pageSize
            });
        }

        if (sortData.field !== field || sortData.order !== order) {
            console.log(field, order);
            setSortData({ field, order });
        }
    };

    return (
        <div {...props}>
            <Table
                dataSource={data}
                loading={loading}
                onChange={onChange}
                pagination={pagination}
                columns={getColumnData(data)}
                bordered={true}
                rowKey='_id'
                size='middle'
            />
        </div>
    );
};

export default DataTable;
