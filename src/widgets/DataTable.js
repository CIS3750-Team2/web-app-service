import React, {useState, useEffect} from 'react';
import _ from 'lodash';

import API from 'core/api';
import {getTableColumns} from 'util/columns';

import {Table, Modal} from 'antd';

const getColumnData = (data) => _.map(
    data,
    ({ id, label }) => ({
        title: label,
        dataIndex: id,
        sortDirections: ['descend', 'ascend'],
        sorter: true
    })
);

const DataTable = ({
    filter,
    search = '',
    pageSizeOptions = ['10', '25', '50', '100'],
    defaultPageSize = 10,
    tableProps,
    ...props
}) => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [count, setCount] = useState(0);
    const [pageData, setPageData] = useState({
        start: 0,
        limit: defaultPageSize
    });
    const [sortData, setSortData] = useState({});
    const [columns, setColumns] = useState([]);

    const pagination = {
        pageSize: pageData.limit,
        current: Math.floor(pageData.start / pageData.limit) + 1,
        pageSizeOptions,
        showSizeChanger: true,
        total: Math.min(count, 1000)
    };

    useEffect(() => {
        setPageData({
            ...pageData,
            start: 0
        });
    }, [filter, search]);
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

    useEffect(() => {
        getTableColumns().then((columns) => {
            setColumns(getColumnData(columns));
        });
    }, []);

    const onChange = ({ current, pageSize }, filters, { field, order }) => {
        if (pagination.current !== current || pagination.pageSize !== pageSize) {
            setPageData({
                limit: pageSize,
                start: (current - 1) * pageSize
            });
        }

        if (sortData.field !== field || sortData.order !== order) {
            setSortData({ field, order });
        }
    };

    return (
        <div {...props}>
            <Table
                bordered={true}
                size='middle'
                {...tableProps}
                dataSource={data}
                loading={loading}
                onChange={onChange}
                pagination={pagination}
                columns={columns}
                rowKey='_id'
            />
        </div>
    );
};

export default DataTable;
