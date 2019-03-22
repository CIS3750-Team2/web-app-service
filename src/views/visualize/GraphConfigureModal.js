import React, {useState} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    getGraphByIndex,
    updateGraph
} from 'core/reducer';

import {ModalProps} from 'util/ModalProvider';
import GraphConfigure from './GraphConfigure';

const GraphConfigureModal = connect(
    (state, { row, index }) => ({
        graph: getGraphByIndex(state, row, index)
    }),
    (dispatch) => bindActionCreators({
        updateGraph
    }, dispatch)
)(({ graph, row, index, updateGraph }) => {
    const [graphData, setGraphData] = useState(graph);

    return (
        <>
            <ModalProps
                title='Configure Visual'
                okText='Save'
                onOk={() => {
                    updateGraph({
                        ...graph,
                        ...graphData
                    }, row, index);
                }}
            />

            <GraphConfigure data={graphData} onChange={setGraphData}/>
        </>
    );
});

export default GraphConfigureModal;
