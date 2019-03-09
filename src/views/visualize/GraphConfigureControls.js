import React from 'react';

import {Form} from 'antd';

const formatGraphData = ({
    ...values
}) => ({
    ...values
});

const GraphConfigureControls = Form.create({
    name: 'graph_configure_form',
    mapPropsToFields: ({ data }) => ({

    }),
    onValuesChange: (
        { onChange },
        changed,
        values
    ) => onChange(formatGraphData(values))
})(({ form: { getFieldDecorator }, data: { type } }) => (
    null
));

export default GraphConfigureControls;
