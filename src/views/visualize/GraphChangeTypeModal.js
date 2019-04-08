import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import { updateGraph } from 'core/reducer';

import {ModalProps, useModals} from 'util/ModalProvider';
import GraphTypeSelect from './GraphTypeSelect';
import {Button} from 'antd';

const GraphChangeTypeModal = useModals(connect(
    null,
    (dispatch) => bindActionCreators({
        updateGraph
    }, dispatch)
)(({ row, index, updateGraph, closeModal }) => {

    return (
        <>
            <ModalProps
                title='Change Visual Type'
                okText='Save'
                footer={
                    <Button onClick={closeModal}>
                        Cancel
                    </Button>
                }
            />

            <GraphTypeSelect onSelect={(type) => {
                updateGraph({ type }, row, index);
                closeModal();
            }}/>
        </>
    );
}));

export default GraphChangeTypeModal;
