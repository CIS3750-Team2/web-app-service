import React, {useState, useEffect} from 'react';
import _ from 'lodash';
import API from 'core/api';

import {
    FlexibleXYPlot,
    LineSeries,
    VerticalBarSeries,
    HeatmapSeries,
    MarkSeries,
    HorizontalGridLines,
    XAxis,
    YAxis,
    ArcSeries,
    Hint
} from 'react-vis';
import {Modal, Spin} from 'antd';

import './Graph.scss';

const SeriesForType = {
    'line': LineSeries,
    'bar': VerticalBarSeries,
    'heatmap': HeatmapSeries,
    'pie': ArcSeries,
    'scatter': MarkSeries
};

const Graph = (data) => {
    const [loading, setLoading] = useState(false);
    const [plotData, setPlotData] = useState([]);
    const [fieldData, setFieldData] = useState([]);
    const [highlight, setHighlight] = useState(undefined);

    useEffect(() => {
        setLoading(true);
        API.loadPlot(data)
            .then((plots) => {
                let i = 0;
                const fields = _.reduce(plots, (acc, { x }) => {
                    acc[(x || '').toString()] = i++;
                    return acc;
                }, {});
                const fieldData = _.map(fields, (idx, str) => str);
                setPlotData(_.map(plots, (point) => ({
                    ...point,
                    x: fields[(point.x || '').toString()]
                })));
                setFieldData(fieldData);
            })
            .catch((err) => {
                console.warn(err);
                Modal.error({
                  content: 'Error while loading, please retry!'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    }, [data]);

    const Series = SeriesForType[data.type];
    let extra;
    const xAxisProps = {
        title: data.xField,
        tickFormat: (v) => fieldData[v],
        position: 'middle',
        tickLabelAngle: data.large ? -90 : 0
    };
    const yAxisProps = {
      title: data.yField,
      position: 'middle',
      orientation: 'left',
    };
    const seriesProps = {};

    if (data.type === 'bar') {
        seriesProps.onNearestX = ({ y }, { index }) => setHighlight({ index, y });
        seriesProps.data = _.map(plotData, (value) => ({
            ...value,
            color: highlight && value.x === highlight.index ? 0 : 1
        }));
        if (highlight !== undefined) {
            extra = <Hint
                value={{ x: highlight.index, y: 0 }}
                format={({ x }) => [{ title: fieldData[x], value: highlight.y }]}
            />;
        }
    } else if (data.type === 'scatter') {
        seriesProps.onNearestXY = (value) => setHighlight(value);
        if (highlight !== undefined) {
            extra = <Hint
                value={highlight}
                format={({ x, y }) => [
                    { title: data.xField, value: fieldData[x] },
                    { title: data.yField, value: y }
                ]}
            />;
        }
    }

    return (
        <div className='graph'>
            {loading
                ? <Spin/>
                : (
                    <FlexibleXYPlot
                        margin={{ left: 75, bottom: data.large ? 120 : 30, right: 20, top: 10 }}
                        onMouseLeave={() => setHighlight(undefined)}
                    >
                        <Series data={plotData} {...seriesProps}/>
                        {extra}
                        <XAxis {...xAxisProps}/>
                        <YAxis {...yAxisProps}/>
                        <HorizontalGridLines/>
                    </FlexibleXYPlot>
                )
            }
        </div>
    );
};

export default Graph;
