import React from 'react';

import {Card, Row, Col} from 'antd';

import lineGraph from 'line_graph.png';
import barGraph from 'bar_graph.png';
import pieChart from 'pie_chart.png';
import scatterPlot from 'scatter_plot.png';
import whiskerGraph from 'whisker_graph.png';
import heatMap from 'heat_map.png';


import './GraphTypeSelect.scss';

const GraphTypeButton = ({ onClick, label, image }) => (
    <Col span={8}>
        <Card
            onClick={onClick}
            hoverable={true}
            className='graph-type-button'
            bodyStyle={{
                padding: '6px'
            }}
        >
            <div className='graph-type-button-icon'><img src = {image}></img></div>
            <span className='graph-type-button-label'>{label}</span>
        </Card>
    </Col>
);

const GraphTypeSelect = ({ onSelect }) =>  (
    <div className='graph-type-select'>
       <Row className='graph-type-row' gutter={12}>
           <GraphTypeButton
               label='Line Graph'
               image={lineGraph}
               onClick={() => onSelect('line')}
           />
           <GraphTypeButton
               label='Bar Graph'
               image={barGraph}
               onClick={() => onSelect('bar')}
           />
           <GraphTypeButton
               label='Pie Chart'
               image={pieChart}
               onClick={() => onSelect('pie')}
           />
       </Row>
        <Row className='graph-type-row' gutter={12}>
            <GraphTypeButton
                label='Scatter Plot'
                image={scatterPlot}
                onClick={() => onSelect('scatter')}
            />
            <GraphTypeButton
                label='Heat Map'
                image={heatMap}
                onClick={() => onSelect('heatmap')}
            />
            <GraphTypeButton
                label='Whisker Graph'
                image={whiskerGraph}
                onClick={() => onSelect('whisker')}
            />
        </Row>
    </div>
);

export default GraphTypeSelect;
