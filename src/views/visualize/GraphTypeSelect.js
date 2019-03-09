import React from 'react';

import {Card, Row, Col} from 'antd';

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
            <div className='graph-type-button-icon'>{image}</div>
            <span className='graph-type-button-label'>{label}</span>
        </Card>
    </Col>
);

const GraphTypeSelect = ({ onSelect }) =>  (
    <div className='graph-type-select'>
       <Row className='graph-type-row' gutter={12}>
           <GraphTypeButton
               label='Line Graph'
               image={null}
               onClick={() => onSelect('line')}
           />
           <GraphTypeButton
               label='Bar Graph'
               image={null}
               onClick={() => onSelect('bar')}
           />
           <GraphTypeButton
               label='Pie Chart'
               image={null}
               onClick={() => onSelect('pie')}
           />
       </Row>
        <Row className='graph-type-row' gutter={12}>
            <GraphTypeButton
                label='Scatter Plot'
                image={null}
                onClick={() => onSelect('scatter')}
            />
            <GraphTypeButton
                label='Heat Map'
                image={null}
                onClick={() => onSelect('heatmap')}
            />
            <GraphTypeButton
                label='Whisker Graph'
                image={null}
                onClick={() => onSelect('whisker')}
            />
        </Row>
    </div>
);

export default GraphTypeSelect;
