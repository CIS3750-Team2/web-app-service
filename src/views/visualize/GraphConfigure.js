import React from 'react';

import DataFilter from 'widgets/DataFilter';
import GraphConfigureControls from './GraphConfigureControls'
import {Divider} from 'antd';

const GraphConfigure = ({ data, onChange, wrappedComponentRef }) => (
    <>
        <GraphConfigureControls
            onChange={onChange}
            data={data}
            wrappedComponentRef={wrappedComponentRef}
        />
        <Divider orientation='left'>
            Filter
        </Divider>
        <DataFilter
            onChange={(filter) => onChange({
                ...data,
                filter
            })}
            filter={data.filter}
        />
    </>
);

export default GraphConfigure;
