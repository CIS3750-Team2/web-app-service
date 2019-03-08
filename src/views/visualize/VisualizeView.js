import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import {
    getGraphs,
    addGraph
} from 'core/reducer';

import {Card} from 'antd';

const VisualizeView = connect(
    (state) => ({
        graphs: getGraphs(state)
    }),
    (dispatch) => bindActionCreators({
        addGraph
    }, dispatch)
)(({ graphs, addGraph }) => (
    <div className='visualize-view'>
        {_.map(graphs, (row) => (
            <Card>

            </Card>
        ))}
    </div>
));

export default VisualizeView;
