import React from 'react';

import Graph from 'widgets/Graph'
import {Card} from 'antd';

const GraphContainer = ({ graph, ...props }) => (
    <Card {...props}>
        <Graph {...graph}/>
    </Card>
);

export default GraphContainer;
