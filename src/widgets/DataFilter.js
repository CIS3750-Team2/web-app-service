import React from 'react';
import {connect} from 'react-redux';
import moment from 'moment';
import _ from 'lodash';

import {getAllFields} from 'core/reducer';
import {provinces} from 'util/constants';

import {
    Form,
    Select,
    Input,
    InputNumber,
    Divider,
    Button,
    Icon,
    Row,
    Col,
    Tooltip
} from 'antd';
import YearPicker from 'widgets/YearPicker';

import './DataFilter.scss';

const formatFilter = ({
    textFiltersLength,
    minYear,
    maxYear,
    ...values
}) => ({
    ...values,
    minYear: minYear && minYear.format('YYYY'),
    maxYear: maxYear && maxYear.format('YYYY')
});

const DataFilter = Form.create({
    name: 'data_filter_form',
    mapPropsToFields: ({ filter }) => ({
        provinces: Form.createFormField({
            value: filter.provinces
        }),
        minYear: Form.createFormField({
            value: filter.minYear ? moment(filter.minYear, 'YYYY') : undefined
        }),
        maxYear: Form.createFormField({
            value: filter.maxYear ? moment(filter.maxYear, 'YYYY') : undefined
        }),
        minSalary: Form.createFormField({
            value: filter.minSalary
        }),
        maxSalary: Form.createFormField({
            value: filter.maxSalary
        }),
        textFilters: _.map(
            filter.textFilters || [],
            (textFilter) => ({
                field: Form.createFormField({
                    value: textFilter.field
                }),
                type: Form.createFormField({
                    value: textFilter.type
                }),
                text: Form.createFormField({
                    value: textFilter.text
                })
            })
        ),
        textFiltersLength: Form.createFormField({
            value: (filter.textFilters || []).length
        })
    }),
    onValuesChange: (
        { onChange },
        changed,
        values
    ) => onChange(formatFilter(values))
})(connect(
    (state) => ({
        fields: getAllFields(state)
    })
)(({
    form: { getFieldDecorator, getFieldValue, getFieldsValue },
    onChange,
    fields = []
}) => {
    const salaryProps = {
        min: 0,
        max: 1000000000,
        step: 10000,
        style: { width: '100%' },
        formatter: (value) => value.length > 0
            ? `$${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            : value,
        parser: (value) => value.length > 0
            ? value.replace(/\$\s?|(,*)/g, '')
            : value
    };
    const yearProps = {
        mode: 'year',
        format: 'YYYY',
        style: { width: '100%' }
    };

    getFieldDecorator('textFiltersLength');
    const textFiltersLength = getFieldValue('textFiltersLength');
    const textFilters = _.map(
        _.range(textFiltersLength),
        (idx) => {
            getFieldDecorator(`textFilters[${idx}].field`);
            getFieldDecorator(`textFilters[${idx}].type`);
            getFieldDecorator(`textFilters[${idx}].text`);
            return {
                field: getFieldValue(`textFilters[${idx}].field`),
                type: getFieldValue(`textFilters[${idx}].type`),
                text: getFieldValue(`textFilters[${idx}].text`),
            }
        }
    );
    const addTextFilter = () => onChange(
        formatFilter({
            ...getFieldsValue(),
            textFilters: [
                ...textFilters,
                {
                    field: fields[0] && fields[0].id,
                    type: 'includes',
                    text: ''
                }
            ]
        })
    );
    const removeTextFilter = (index) => onChange(
        formatFilter({
            ...getFieldsValue(),
            textFilters: _.filter(textFilters, (value, idx) => idx !== index)
        })
    );

    return (
        <Form
            layout='horizontal'
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 20 }}
            className='data-filter-form'
        >
            <Form.Item label='Provinces'>
                {getFieldDecorator('provinces')(
                    <Select
                        mode='multiple'
                    >
                        {_.map(provinces, (province) => (
                            <Select.Option key={province}>
                                {province}
                            </Select.Option>
                        ))}
                    </Select>
                )}
            </Form.Item>

            <Form.Item
                label='Years'
                className='form-range-group'
            >
                <Form.Item className='form-range-item'>
                    {getFieldDecorator('minYear')(
                        <YearPicker
                            {...yearProps}
                            placeholder='No lower bound'
                        />
                    )}
                </Form.Item>
                <span className='form-range-separator'> ~ </span>
                <Form.Item className='form-range-item'>
                    {getFieldDecorator('maxYear')(
                        <YearPicker
                            {...yearProps}
                            placeholder='No upper bound'
                        />
                    )}
                </Form.Item>
            </Form.Item>

            <Form.Item
                label='Salaries'
                className='form-range-group'
            >
                <Form.Item className='form-range-item'>
                    {getFieldDecorator('minSalary')(
                        <InputNumber
                            {...salaryProps}
                            placeholder='No lower bound'
                        />
                    )}
                </Form.Item>
                <span className='form-range-separator'> ~ </span>
                <Form.Item className='form-range-item'>
                    {getFieldDecorator('maxSalary')(
                        <InputNumber
                            {...salaryProps}
                            placeholder='No upper bound'
                        />
                    )}
                </Form.Item>
            </Form.Item>

            <Divider orientation='left'>
                Text Filters
            </Divider>

            {_.map(textFilters, (textFilter, idx) => (
                <Form.Item
                    key={idx}
                    wrapperCol={{ span: 24 }}
                    className='form-small-group'
                >
                    <Row gutter={12}>
                        <Col span={7}>
                            <Form.Item>
                                {getFieldDecorator(`textFilters[${idx}].field`)(
                                    <Select
                                        placeholder='Field'
                                    >
                                        {_.map(fields, ({ id, label }) => (
                                            <Select.Option key={id}>
                                                {label}
                                            </Select.Option>
                                        ))}
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={6}>
                            <Form.Item>
                                {getFieldDecorator(`textFilters[${idx}].type`)(
                                    <Select
                                        placeholder='Type'
                                    >
                                        <Select.Option key='includes'>
                                            Includes
                                        </Select.Option>
                                        <Select.Option key='not_includes'>
                                            Not Includes
                                        </Select.Option>
                                        <Select.Option key='matches'>
                                            Matches
                                        </Select.Option>
                                        <Select.Option key='not_matches'>
                                            Not Matches
                                        </Select.Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={9}>
                            <Form.Item>
                                {getFieldDecorator(`textFilters[${idx}].text`)(
                                    <Input
                                        placeholder='Text'
                                    />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={2}>
                            <Tooltip
                                title='Remove filter'
                                placement='left'
                            >
                                <Button
                                    shape='circle'
                                    icon='close'
                                    onClick={() => removeTextFilter(idx)}
                                />
                            </Tooltip>
                        </Col>
                    </Row>
                </Form.Item>
            ))}

            <Button
                type='dashed'
                style={{ width: '100%' }}
                onClick={addTextFilter}
            >
                <Icon type="plus"/> Add text filter
            </Button>
        </Form>
    );
}));

export default DataFilter;
