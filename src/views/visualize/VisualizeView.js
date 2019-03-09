import React from 'react';
import {connect} from 'react-redux';

import { getGraphs } from 'core/reducer';

import {useModals} from 'util/ModalProvider';
import AddGraphTypeModal from './AddGraphTypeModal';
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
    })
)(({ graphs, openModal }) => {
    const addGraph = (row) => openModal(
        <AddGraphTypeModal row={row}/>
    );

    return (
        <div className='visualize-view'>
            {_.map(graphs, (row, rowIdx) => (
                <Card className='graph-row' key={rowIdx}>
                    {_.map(row, (graph, graphIdx) => (
                        <GraphContainer
                            className='graph-row-item'
                            graph={graph}
                            key={graphIdx}
                        />
                    ))}

                    <AddGraphButton onClick={() => addGraph(rowIdx)}/>
                </Card>
            ))}

            <Card className='graph-row'>
                <AddGraphButton onClick={() => addGraph()}/>
            </Card>
        </div>
    );
}));

export default VisualizeView;
