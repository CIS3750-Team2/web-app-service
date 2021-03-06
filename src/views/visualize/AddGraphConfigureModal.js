import React, {useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {addGraph} from 'core/reducer';
import {emptyGraph} from 'util/constants';

import {ModalProps, useModals} from 'util/ModalProvider';
import GraphConfigure from './GraphConfigure';
import AddGraphTypeModal from './AddGraphTypeModal';

const AddGraphConfigureModal = useModals(connect(
    null,
    (dispatch) => bindActionCreators({
        addGraph
    }, dispatch)
)(({ openModal, row, type, addGraph }) => {
    const [graphData, setGraphData] = useState({
        ...emptyGraph,
        type
    });

    return (
        <>
            <ModalProps
                title='Add Visual - 2/2'
                closable={false}
                maskClosable={false}
                cancelText='Back'
                okText='Add'
                onCancel={() => {
                    openModal(
                        <AddGraphTypeModal row={row}/>
                    );
                    return true;
                }}
                onOk={() => {
                    addGraph(graphData, row);
                }}
            />

            <GraphConfigure data={graphData} onChange={setGraphData}/>
        </>
    );
}));

export default AddGraphConfigureModal;
