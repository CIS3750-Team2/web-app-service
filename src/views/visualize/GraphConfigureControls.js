import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import {getTableColumns} from 'util/columns';

import {Form, Select, Tag} from 'antd';

const GraphConfigureControls = Form.create({
    name: 'graph_configure_form',
    mapPropsToFields: ({ data }) => ({
        xField: Form.createFormField({ value: data.xField }),
        yField: Form.createFormField({ value: data.yField }),
        yMethod: Form.createFormField({ value: data.yMethod })
    }),
    onValuesChange: (
        { onChange, data },
        changed,
        values
    ) => onChange({
        ...data,
        ...values
    })
})(({ form: { getFieldDecorator, setFieldsValue }, data: { type, xField, yField, yMethod } }) => {
    const [fields, setFields] = useState([]);
    useEffect(() => {
        getTableColumns().then(setFields)
    }, []);

    const fieldOptions = _.map(fields, ({ id, label }) => (
        <Select.Option key={id} value={id}>
            {label}
        </Select.Option>
    ));
    const fieldSelectProps = {
        optionFilterProp: 'value',
        showSearch: true,
        mode: 'default',
        filterOption: (search, opt) => opt.props.value.toLowerCase().includes(search.toLowerCase())
    };

    useEffect(() => {
        const update = {};
        if (!xField || xField.length === 0) update.xField = _.get(fields, [0, 'id']);
        if (!yField || yField.length === 0) update.yField = _.get(fields, [0, 'id']);
        if (!yMethod || yMethod.length === 0) update.yMethod = 'avg';

        if (_.keys(update).length > 0) setFieldsValue(update);
    }, [xField, yField, yMethod, fields]);

    return (
        <Form
            layout='horizontal'
            labelCol={{ span: 9 }}
            wrapperCol={{ span: 15 }}
            className='graph-controls-form'
        >
            <Form.Item label='Visualization Type'>
                <Tag>
                    {type.toUpperCase()}
                </Tag>
            </Form.Item>
            <Form.Item label='Horizontal (X) Axis'>
                {getFieldDecorator('xField', {
                    rules: [{
                        required: true,
                        message: 'X-axis is required'
                    }]
                })(
                    <Select {...fieldSelectProps}>
                        {fieldOptions}
                    </Select>
                )}
            </Form.Item>
            <Form.Item label='Vertical (Y) Axis'>
                {getFieldDecorator('yField', {
                    rules: [{
                        required: true,
                        message: 'Y-axis is required'
                    }]
                })(
                    <Select {...fieldSelectProps}>
                        {fieldOptions}
                    </Select>
                )}
            </Form.Item>
            <Form.Item label='Data Method'>
                {getFieldDecorator('yMethod', {
                    rules: [{
                        required: true,
                        message: 'Data method is required'
                    }]
                })(
                    <Select mode='default'>
                        <Select.Option key='avg'>Average</Select.Option>
                        <Select.Option key='min'>Minimum</Select.Option>
                        <Select.Option key='max'>Maximum</Select.Option>
                        <Select.Option key='std'>Standard Deviation</Select.Option>
                        <Select.Option key='sum'>Total</Select.Option>
                        <Select.Option key='count'>Count</Select.Option>
                    </Select>
                )}
            </Form.Item>
        </Form>
    );
});

export default GraphConfigureControls;
