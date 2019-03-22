import React from 'react';

import Graph from 'widgets/Graph'
import {Card, Button, Tooltip, Dropdown, Menu} from 'antd';

import './GraphContainer.scss';

const noop = () => {};

const GraphContainer = ({
    graph, className = '',
    onExpand = noop, onRemove = noop, onChangeType = noop,
    onConfigure = noop, onDuplicate = noop,
    ...props
}) => {
    const onMenuClick = ({ key }) => {
        switch (key) {
            case 'type': return onChangeType();
            case 'configure': return onConfigure();
            case 'duplicate': return onDuplicate();
            default: return null;
        }
    };
    const onExpandClick = () => onExpand();
    const onRemoveClick = () => onRemove();

    return (
        <Card className={`graph-container ${className}`} {...props}>
            <Graph {...graph}/>
            <div className='graph-container-controls'>
                <Button.Group>
                    <Tooltip placement='bottomLeft' title='Expand'>
                        <Button type='default' icon='fullscreen' onClick={onExpandClick}/>
                    </Tooltip>

                    <Dropdown overlay={
                        <Menu onClick={onMenuClick}>
                            <Menu.Item key='type'>Change Type...</Menu.Item>
                            <Menu.Item key='configure'>Configure...</Menu.Item>
                            <Menu.Item key='duplicate'>Duplicate</Menu.Item>
                        </Menu>
                    }>
                        <Button type='default' icon='setting'/>
                    </Dropdown>

                    <Tooltip placement='bottomRight' title='Remove'>
                        <Button type='default' icon='close' onClick={onRemoveClick}/>
                    </Tooltip>
                </Button.Group>
            </div>
        </Card>
    );
};

export default GraphContainer;
