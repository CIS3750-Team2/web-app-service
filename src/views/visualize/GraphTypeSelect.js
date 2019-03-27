import React from 'react';

import {Card, Row, Col, Tooltip} from 'antd';

import lineGraph from 'line_graph.png';
import barGraph from 'bar_graph.png';
import pieChart from 'pie_chart.png';
import scatterPlot from 'scatter_plot.png';
import whiskerGraph from 'whisker_graph.png';
import heatMap from 'heat_map.png';

import './GraphTypeSelect.scss';

const GraphTypeButton = ({
    onClick,
    label,
    image,
    disabled = false,
    alt,
    altPos
}) => (
    <Col span={8}>
        <Tooltip
            title={disabled ? 'Visual type is not currently supported' : alt}
            placement={altPos || 'top'}
        >
            <Card
                onClick={onClick}
                hoverable={!disabled}
                className={`graph-type-button ${disabled ? 'disabled' : ''}`}
                bodyStyle={{
                    padding: '6px'
                }}
            >
                <div className='graph-type-button-icon'>
                    <img
                        src={image}
                        alt='Visual sample image'
                    />
                </div>
                <span className='graph-type-button-label'>{label}</span>
            </Card>
        </Tooltip>
    </Col>
);

const GraphTypeSelect = ({ onSelect }) =>  (
    <div className='graph-type-select'>
       <Row className='graph-type-row' gutter={12}>
           <GraphTypeButton
               label='Line Graph'
               image={lineGraph}
               alt='Visual type is partially supported'
               onClick={() => onSelect('line')}
               altPos='top'
           />
           <GraphTypeButton
               label='Bar Graph'
               image={barGraph}
               onClick={() => onSelect('bar')}
               altPos='top'
           />
           <GraphTypeButton
               label='Pie Chart'
               image={pieChart}
               disabled={true}
               onClick={() => onSelect('pie')}
               altPos='top'
           />
       </Row>
        <Row className='graph-type-row' gutter={12}>
            <GraphTypeButton
                label='Scatter Plot'
                image={scatterPlot}
                onClick={() => onSelect('scatter')}
                altPos='bottom'
            />
            <GraphTypeButton
                label='Whisker Graph'
                image={whiskerGraph}
                disabled={true}
                onClick={() => onSelect('whisker')}
                altPos='bottom'
            />
            <GraphTypeButton
                label='Heat Map'
                image={heatMap}
                disabled={true}
                onClick={() => onSelect('heatmap')}
                altPos='bottom'
            />
        </Row>
    </div>
);

export default GraphTypeSelect;
