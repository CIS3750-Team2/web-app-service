import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    getGraphs,
    removeGraph,
    addGraph
} from 'core/reducer';

import {useModals} from 'util/ModalProvider';
import AddGraphTypeModal from './AddGraphTypeModal';
import GraphViewModal from './GraphViewModal';
import GraphConfigureModal from './GraphConfigureModal';
import GraphChangeTypeModal from './GraphChangeTypeModal';
import GraphContainer from './GraphContainer';
import {Card, Icon} from 'antd';

import './VisualizeView.scss';

const AddGraphButton = ({ className = '', ...props }) => (
    <Card
        {...props}
        className={'graph-row-add-button ' + className}
        hoverable={true}
    >
        <Icon type='plus'/>
    </Card>
);

const VisualizeView = useModals(connect(
    (state) => ({
        graphs: getGraphs(state)
    }),
    (dispatch) => bindActionCreators({
        addGraph,
        removeGraph
    }, dispatch)
)(({ graphs, openModal, removeGraph, addGraph }) => {
    const addGraphHandler = (row) => () => openModal(
        <AddGraphTypeModal row={row}/>
    );
    const expandGraphHandler = (graph) => () => openModal(
        <GraphViewModal graph={graph}/>
    );
    const removeGraphHandler = (row, idx) => () => removeGraph(row, idx);
    const changeTypeHandler = (row, idx) => () => openModal(
        <GraphChangeTypeModal row={row} index={idx}/>
    );
    const configureGraphHandler = (row, idx) => () => openModal(
        <GraphConfigureModal row={row} index={idx}/>
    );
    const duplicateGraphHandler = (row, idx) => () => addGraph(graphs[row][idx], row);

    useEffect(() => {
        if (graphs.length === 0) {
            addGraphHandler()();
        }
    }, []);

    return (
        <div className='visualize-view'>
            {_.map(graphs, (row, rowIdx) => (
                <Card className='graph-row' key={rowIdx}>
                    {_.map(row, (graph, graphIdx) => (
                        <GraphContainer
                            className='graph-row-item'
                            graph={graph}
                            key={graphIdx}
                            onExpand={expandGraphHandler(graph)}
                            onRemove={removeGraphHandler(rowIdx, graphIdx)}
                            onChangeType={changeTypeHandler(rowIdx, graphIdx)}
                            onConfigure={configureGraphHandler(rowIdx, graphIdx)}
                            onDuplicate={duplicateGraphHandler(rowIdx, graphIdx)}
                        />
                    ))}

                    <AddGraphButton onClick={addGraphHandler(rowIdx)}/>
                </Card>
            ))}

            <Card className='graph-row'>
                <AddGraphButton onClick={addGraphHandler()}/>
            </Card>
        </div>
    );
}));

export default VisualizeView;
