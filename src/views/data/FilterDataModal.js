import React, {useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {getTableColumns} from 'util/columns';
import {
    getTableFilter,
    getRawData,
    setTableFilter
} from 'core/reducer';

import {useModals} from 'util/ModalProvider';
import DataFilter from 'widgets/DataFilter';
import {ModalProps} from 'util/ModalProvider';
import {Button} from "antd";

const FilterDataModal = useModals(connect(
    (state) => ({
        tableFilter: getTableFilter(state),
        fields: getTableColumns(getRawData(state))
    }),
    (dispatch) => bindActionCreators({
        setTableFilter
    }, dispatch)
)(({ tableFilter, fields, setTableFilter, closeModal }) => {
    const [filter, setFilter] = useState(tableFilter);
    const onSave = () => {
        setTableFilter(filter);
        closeModal();
    };

    return (
        <>
            <ModalProps
                title='Modify Filters'
                footer={
                    <Button
                        type='primary'
                        onClick={onSave}
                    >
                        Save
                    </Button>
                }
            />
            <DataFilter
                onChange={setFilter}
                filter={filter}
                fields={fields}
            />
        </>
    );
}));

export default FilterDataModal;
